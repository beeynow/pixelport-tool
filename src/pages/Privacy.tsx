import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
<Helmet>
        <title>Privacy Policy | ConvertAny.site</title>
        <meta name="description" content="ConvertAny.site Privacy Policy - Learn how we protect your data. Free online file converter with minimal data collection." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p className="lead">Effective Date: October 2025</p>
            
            <p>
              Welcome to ConvertAny.site — a free online tool platform designed to help users easily convert files across multiple formats. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We do not require users to create an account or share personal data to use our services. However, we may collect the following:</p>
            <ul>
              <li>Basic technical data such as IP address, browser type, and device information.</li>
              <li>Anonymous usage analytics to improve website performance and features.</li>
              <li>Cookies from Google and third-party vendors (such as AdSense) for advertising and analytics.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use collected data to:</p>
            <ul>
              <li>Improve our website performance and user experience.</li>
              <li>Serve personalized or non-personalized ads through Google AdSense.</li>
              <li>Prevent spam, fraud, and abuse, and to troubleshoot technical issues.</li>
            </ul>

            <h2>3. Cookies and Google Advertising</h2>
            <p>
              We use Google AdSense, which may use cookies to serve ads based on your previous visits to this or other websites. 
              Google's use of advertising cookies enables it and its partners to serve ads based on your visit to ConvertAny.site and other websites.
            </p>
            <p>
              You can opt out of personalized advertising by visiting:{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                https://www.google.com/settings/ads
              </a>
            </p>

            <h2>4. Data Security</h2>
            <p>
              We do not sell, rent, or trade personally identifiable information to third parties. We implement reasonable security measures 
              (HTTPS, server security practices) to protect data; however, no online service is completely risk-free.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Our site may contain links to external websites. We are not responsible for the content or privacy practices of those external sites.
            </p>

            <h2>6. Children's Privacy</h2>
            <p>
              ConvertAny.site is designed for general audiences and does not knowingly collect data from anyone under 13.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, contact:{" "}
              <a href="mailto:convertany.site@gmail.com">convertany.site@gmail.com</a>
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
