import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | ConvertAny.site - Service Usage Agreement</title>
        <meta
          name="description"
          content="Terms and Conditions for ConvertAny.site - Read our terms of service, usage policies, and legal information for using our free online file converter tools. Understand your rights and responsibilities."
        />
        <meta name="keywords" content="terms and conditions, convertany terms, service agreement, usage policy, legal terms" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.convertany.site/terms" />
        <meta property="og:site_name" content="Convertany" />
        <meta property="og:title" content="Terms & Conditions - Convertany" />
        <meta property="og:description" content="Read our terms of service and usage policies for Convertany." />
        <meta property="og:url" content="https://www.convertany.site/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions - Convertany" />
        <meta name="twitter:description" content="Service usage agreement and legal terms for Convertany." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
              Terms & Conditions
            </h1>
            <p className="lead">Effective Date: October 2025</p>

            <p>
              Welcome to ConvertAny.site. By accessing or using this website,
              you agree to the following terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              1. General Use
            </h2>
            <p>
              ConvertAny.site provides free online file conversion tools. You
              agree to use our tools responsibly and not for illegal, harmful,
              or infringing purposes.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              2. Intellectual Property
            </h2>
            <p>
              All text, design, images, and software code on this website are
              owned or licensed by ConvertAny.site. You may not copy, reproduce,
              distribute, or create derivative works from our content without
              prior written permission.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              3. Limitation of Liability
            </h2>
            <p>
              ConvertAny.site and its owners/operators are not responsible for
              any data loss, file corruption, or damage resulting from the use
              of our tools. Use of the site is at your own risk. We recommend
              keeping backups of important files.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              4. External Links and Ads
            </h2>
            <p>
              Our website may display third-party advertisements (for example,
              Google AdSense). We are not responsible for the content, accuracy,
              or security of external websites or ads.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              5. Service Availability
            </h2>
            <p>
              We strive to provide continuous access to the site but do not
              guarantee uninterrupted service. We reserve the right to modify,
              suspend, or discontinue any feature at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              6. Termination
            </h2>
            <p>
              We may suspend or terminate access to the site for users who
              violate these Terms or who engage in abusive or fraudulent
              activity.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              7. Changes to Terms
            </h2>
            <p>
              We may update these Terms periodically. Continued use of the site
              after changes constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              8. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws applicable in the operator's
              jurisdiction. Disputes will be resolved according to local
              applicable law.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10">
              9. Contact Information
            </h2>
            <p>
              For questions about these Terms, contact:{" "}
              <a
                href="mailto:convertany.site@gmail.com"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                convertany.site@gmail.com
              </a>
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
