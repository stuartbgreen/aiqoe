import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata = {
  title: "Terms of Service - Arvus",
  description: "Terms of service for Arvus AI-powered due diligence platform",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-garamond font-semibold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: November 16, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service ("Terms") govern your use of the Arvus platform operated by Teras Media LLC,
              doing business as Arvus ("Arvus", "we", "us", or "our"). By accessing or using our services,
              you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="text-muted-foreground mb-4">
              Arvus provides AI-powered tools designed to assist private equity firms, M&A advisory firms,
              and transaction advisory teams with financial due diligence tasks, including data cleanup,
              analysis, and reporting automation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Professional Use & Client Data</h2>
            <h3 className="text-xl font-semibold mb-3">Authorized Use</h3>
            <p className="text-muted-foreground mb-4">
              Our services are intended for use by professional firms in connection with legitimate due diligence activities.
              You represent that you have all necessary rights and authorizations to upload and process any data through our platform.
            </p>

            <h3 className="text-xl font-semibold mb-3">Data Ownership</h3>
            <p className="text-muted-foreground mb-4">
              You retain all ownership rights to the data you upload. We claim no ownership over your financial data,
              client information, or work product created using our platform.
            </p>

            <h3 className="text-xl font-semibold mb-3">Confidentiality</h3>
            <p className="text-muted-foreground mb-4">
              We understand that data processed through Arvus is highly confidential. We maintain strict confidentiality
              protocols and will not access, use, or disclose your data except as necessary to provide the services or
              as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">AI-Generated Output</h2>
            <p className="text-muted-foreground mb-4">
              Our platform uses artificial intelligence to analyze and process financial data. While we strive for accuracy:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>AI-generated outputs are tools to assist your analysis, not replace professional judgment</li>
              <li>You are responsible for reviewing and verifying all outputs before relying on them</li>
              <li>We do not guarantee the accuracy, completeness, or reliability of AI-generated content</li>
              <li>You should apply appropriate professional due diligence standards to all work product</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Provide accurate account and billing information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service only for lawful purposes in compliance with applicable regulations</li>
              <li>Not attempt to reverse engineer, hack, or compromise our platform</li>
              <li>Not upload malicious code, viruses, or harmful content</li>
              <li>Comply with all applicable laws regarding data protection and privacy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">You may not use our services to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Process data you are not authorized to access or use</li>
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Engage in fraudulent or deceptive practices</li>
              <li>Interfere with or disrupt the platform or servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Availability & Modifications</h2>
            <p className="text-muted-foreground mb-4">
              We strive to maintain high service availability but do not guarantee uninterrupted access.
              We reserve the right to modify, suspend, or discontinue any aspect of the service with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Fees & Payment</h2>
            <p className="text-muted-foreground mb-4">
              Fees for our services are as described in your service agreement or on our pricing page.
              You agree to pay all applicable fees on time. We may modify fees with advance notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
              <li>WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES YOU PAID IN THE 12 MONTHS PRECEDING THE CLAIM</li>
              <li>WE ARE NOT LIABLE FOR DECISIONS MADE BASED ON AI-GENERATED OUTPUTS</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              You acknowledge that professional due diligence requires human judgment and expertise, and our tools
              are intended to supplement, not replace, such judgment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
            <p className="text-muted-foreground mb-4">
              You agree to indemnify and hold harmless Arvus and Teras Media LLC from any claims, damages, or expenses
              arising from your use of the service, your violation of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your data. However, no system is completely secure.
              You acknowledge the inherent risks of internet transmission and electronic storage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="text-muted-foreground mb-4">
              Either party may terminate your account with notice. Upon termination:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Your access to the platform will cease</li>
              <li>You remain responsible for fees incurred before termination</li>
              <li>We will retain or delete your data according to our Privacy Policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by the laws of the State of Illinois, without regard to its conflict of law provisions.
              Any disputes shall be resolved in the courts located in Chicago, Illinois.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We may update these Terms from time to time. Material changes will be communicated via email or platform notification.
              Continued use of the service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms, please contact:
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