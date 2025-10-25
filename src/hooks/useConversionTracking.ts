import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useConversionTracking = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const trackConversion = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to perform conversions",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase.rpc('increment_conversion_count', {
        user_id: user.id
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error tracking conversion:", error);
      toast({
        title: "Error",
        description: "Failed to track conversion. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getConversionStats = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('clerk_user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error("Error fetching conversion stats:", error);
      return null;
    }
  };

  return { trackConversion, getConversionStats };
};
