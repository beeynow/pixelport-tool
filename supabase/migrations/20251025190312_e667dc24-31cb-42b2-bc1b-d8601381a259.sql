-- Create table to track user subscriptions and usage
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  conversions_today INTEGER NOT NULL DEFAULT 0,
  last_conversion_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions
FOR SELECT
USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own subscription"
ON public.user_subscriptions
FOR UPDATE
USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Function to reset daily conversions
CREATE OR REPLACE FUNCTION public.reset_daily_conversions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_subscriptions
  SET conversions_today = 0
  WHERE last_conversion_date < CURRENT_DATE;
END;
$$;

-- Function to increment conversion count
CREATE OR REPLACE FUNCTION public.increment_conversion_count(user_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Reset if date changed
  UPDATE public.user_subscriptions
  SET 
    conversions_today = 1,
    last_conversion_date = CURRENT_DATE,
    updated_at = now()
  WHERE clerk_user_id = user_id AND last_conversion_date < CURRENT_DATE;
  
  -- Increment if same date
  UPDATE public.user_subscriptions
  SET 
    conversions_today = conversions_today + 1,
    updated_at = now()
  WHERE clerk_user_id = user_id AND last_conversion_date = CURRENT_DATE;
  
  -- Insert if doesn't exist
  INSERT INTO public.user_subscriptions (clerk_user_id, conversions_today, last_conversion_date)
  VALUES (user_id, 1, CURRENT_DATE)
  ON CONFLICT (clerk_user_id) DO NOTHING;
END;
$$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
