import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ConvertAny.site</title>
        <meta
          name="description"
          content="ConvertAny.site Privacy Policy — Learn how we collect, use, and protect your information. Fully compliant with AdSense, Analytics, GDPR, CCPA, and CalOPPA."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h1>Privacy Policy — ConvertAny.site</h1>
            <p className="lead">Effective Date: October 31, 2025</p>

            <p>
              This Privacy Policy explains how ConvertAny.site (“we”, “us”,
              “our”, or “Site”) collects, uses, shares, and protects personal
              information; how we use Google services (Google Analytics, Google
              Ads/AdSense); and how you can exercise privacy rights under GDPR,
              CCPA/CPRA, CalOPPA, and other applicable laws.
            </p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li>Email address when you contact us via email or forms.</li>
              <li>
                Usage data: pages viewed, browser type, IP (may be anonymized),
                referrer, and device info.
              </li>
              <li>Cookies and tracking identifiers for ads and analytics.</li>
              <li>
                Ad-related data: impressions, clicks, and performance metrics.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Provide, maintain, and improve our services and features.</li>
              <li>Analyze usage, diagnose issues, and optimize performance.</li>
              <li>
                Measure ad impressions, clicks, and revenue with Google AdSense.
              </li>
              <li>
                Respond to user inquiries and comply with legal obligations.
              </li>
            </ul>
            <p>We do not sell personal information for money.</p>

            <h2>3. Cookies, Tracking & Third-Party Technologies</h2>
            <p>
              We and third-party partners use cookies and similar technologies
              to provide functionality, analytics, and advertising.
            </p>
            <ul>
              <li>Essential cookies — for basic site operation.</li>
              <li>Analytics cookies — via Google Analytics.</li>
              <li>Advertising cookies — via Google AdSense / Google Ads.</li>
            </ul>
            <p>
              You can manage or opt out of personalized ads at:{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://adssettings.google.com
              </a>{" "}
              or use the Google Analytics opt-out browser add-on:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>

            <h2>4. Google Services & AdSense Disclosure</h2>
            <p>
              ConvertAny.site participates in Google AdSense. Google may use
              cookies to serve ads based on your visits to this and other
              websites. You may opt out of personalized advertising using
              Google’s Ads Settings. For more details, see Google’s{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Advertising Policy
              </a>
              .
            </p>

            <h2>5. Legal Bases for Processing (GDPR)</h2>
            <p>
              If you are in the EU/EEA or UK, we process data under these bases:
              Consent, Legitimate Interests, and Legal Obligation. You may
              withdraw consent for non-essential cookies at any time.
            </p>

            <h2>6. Your Privacy Rights</h2>
            <h3>GDPR (EU/EEA/UK)</h3>
            <ul>
              <li>Access, correct, or delete your personal data.</li>
              <li>Restrict or object to processing.</li>
              <li>Request data portability.</li>
            </ul>
            <p>
              To exercise these rights, email{" "}
              <a href="mailto:convertany.site@gmail.com">
                convertany.site@gmail.com
              </a>{" "}
              with subject line “Privacy Request”.
            </p>

            <h3>CCPA / CPRA (California)</h3>
            <ul>
              <li>Know what personal information we collect and use.</li>
              <li>Request deletion of your personal data.</li>
              <li>
                Opt out of sale or sharing (we do not currently sell personal
                data).
              </li>
              <li>Non-discrimination for exercising privacy rights.</li>
            </ul>

            <h3>CalOPPA</h3>
            <p>
              We disclose how we handle Do Not Track (DNT) signals: currently,
              we do not respond to DNT browser signals.
            </p>

            <h2>7. Do Not Sell / Share My Personal Information</h2>
            <p>
              California residents can request opt-out from any data sharing for
              advertising by emailing{" "}
              <a href="mailto:convertany.site@gmail.com">
                convertany.site@gmail.com
              </a>{" "}
              with the subject “Do Not Sell or Share My Info”.
            </p>

            <h2>8. Data Retention</h2>
            <p>
              Analytics and aggregated metrics are typically retained for up to
              26 months. Contact messages are retained until resolved (or up to
              1 year) unless required longer by law.
            </p>

            <h2>9. Data Security</h2>
            <p>
              We use HTTPS, secure servers, and reasonable measures to protect
              your information. However, no online system is completely secure.
            </p>

            <h2>10. Children’s Privacy</h2>
            <p>
              ConvertAny.site is not directed to children under 13 and does not
              knowingly collect their data. If you believe we have done so,
              contact us for prompt deletion.
            </p>

            <h2>11. International Transfers</h2>
            <p>
              Our servers and service providers may be located outside your
              country. We ensure data is transferred with proper safeguards
              (e.g., standard contractual clauses).
            </p>

            <h2>12. Third-Party Links</h2>
            <p>
              Our site may contain links to external websites. We are not
              responsible for their privacy policies or content.
            </p>

            <h2>13. How to Contact Us</h2>
            <p>
              For privacy inquiries or rights requests, contact:{" "}
              <a href="mailto:convertany.site@gmail.com">
                convertany.site@gmail.com
              </a>
            </p>

            <h2>14. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Updates will be
              posted here with a revised effective date.
            </p>

            <h2>15. AdSense Verification Statement</h2>
            <p>
              “This site uses Google AdSense and Google Analytics. We disclose
              our use of cookies and tracking, provide opt-out mechanisms, and
              maintain a published privacy policy that includes GDPR, CCPA/CPRA,
              and CalOPPA compliance language. Contact:
              convertany.site@gmail.com.”
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
