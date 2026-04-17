import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
      {title}
    </h2>
    <div className="text-gray-600 space-y-3 leading-relaxed">
      {children}
    </div>
  </div>
);

const Privacypolicy = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>

      <Section title="Information We Collect">
        <p>Name, email address, and phone number</p>
        <p>Shipping and billing address</p>
        <p>Payment information (securely processed)</p>
      </Section>

      <Section title="How We Use Your Information">
        <p>To process and deliver your orders</p>
        <p>To improve user experience</p>
        <p>To send order updates and notifications</p>
      </Section>

      <Section title="Data Security">
        <p>
          We use secure and encrypted systems to protect your personal data.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          You can request access, correction, or deletion of your data at any time.
        </p>
      </Section>
      <div className="bg-blue-100 p-4 rounded mb-6">
        We respect your privacy and never sell your data.
      </div>
      <p className="text-sm text-gray-400 mt-6">
        Last updated: April 2026
      </p>

    </div>

  );
};

export default Privacypolicy;