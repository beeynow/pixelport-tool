import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Trigger AdSense ad rendering
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 1-3 business days.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ConvertAny.site - Get in Touch</title>
        <meta
          name="description"
          content="Contact ConvertAny.site for support, feedback, or business inquiries. We typically respond within 1-3 business days."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                We're happy to help! For support, feedback, or business
                inquiries, reach out to us.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Typical response time: 1–3 business days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={sending}>
                    <Send className="w-4 h-4 mr-2" />
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    Or email us directly at:{" "}
                    <a
                      href="mailto:convertany.site@gmail.com"
                      className="text-primary hover:underline font-medium"
                    >
                      convertany.site@gmail.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* ✅ Adsense block */}
          <div className="my-10 flex justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: 40 }}
              data-ad-client="ca-pub-7858868028312077"
              data-ad-slot="3376852857"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
