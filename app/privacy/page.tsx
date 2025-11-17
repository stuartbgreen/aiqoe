import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata = {
  title: "Privacy Policy - Arvus",
  description: "Privacy policy for Arvus AI-powered due diligence platform",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <LandingHeader />

      <div className="flex-1 mx-auto max-w-4xl px-6 py-12 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-garamond font-semibold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: November 16, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Teras Media LLC, doing business as Arvus ("Arvus", "we", "us", or "our"), operates the Arvus platform.
              This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our AI-powered due diligence services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">Account Information</h3>
            <p className="text-muted-foreground mb-4">
              When you create an account, we collect your name, email address, company name, and contact information.
            </p>

            <h3 className="text-xl font-semibold mb-3">Financial Data</h3>
            <p className="text-muted-foreground mb-4">
              Our platform processes financial documents and data you upload for due diligence purposes. This may include
              financial statements, transaction records, and other business-sensitive information.
            </p>

            <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
            <p className="text-muted-foreground mb-4">
              We collect information about how you interact with our platform, including features used, actions taken,
              and technical data such as IP address, browser type, and device information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>To provide and improve our AI-powered due diligence services</li>
              <li>To process and analyze the financial data you upload</li>
              <li>To communicate with you about your account and our services</li>
              <li>To ensure platform security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security & Confidentiality</h2>
            <p className="text-muted-foreground mb-4">
              We understand the sensitive nature of M&A transactions and financial due diligence. We implement
              industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure access controls and authentication</li>
              <li>Regular security audits and monitoring</li>
              <li>Strict confidentiality protocols for all personnel</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your data. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>With your explicit consent</li>
              <li>With service providers who assist in platform operations (under strict confidentiality agreements)</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transaction (merger, acquisition, or sale of assets)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">AI Processing & Training</h2>
            <p className="text-muted-foreground mb-4">
              Your uploaded financial data is processed by our AI systems to provide analysis and insights.
              We do not use your confidential financial data to train our AI models without your explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your data for as long as your account is active or as needed to provide services.
              You may request deletion of your data at any time, subject to legal retention requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="text-muted-foreground mb-2">
              Teras Media LLC (dba Arvus)<br />
              Email: <a href="mailto:hello@arvus.ai" className="text-foreground hover:underline">hello@arvus.ai</a><br />
              Chicago, IL
            </p>
          </section>
        </div>
      </div>

      <LandingFooter />
    </main>
  );
}
