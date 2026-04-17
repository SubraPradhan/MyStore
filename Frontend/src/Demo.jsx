import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="text-gray-600 space-y-3">{children}</div>
  </div>
);

export const Support = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Support</h1>
    <p className="text-gray-600 mb-4">
      Need help? We’ve got you. From order tracking to returns, everything you need is right here.
    </p>
    <p className="text-gray-600">Email: support@yourstore.com</p>
    <p className="text-gray-600">Response time: within 24 hours</p>
  </div>
);

export const HelpCenter = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Help Center</h1>
    <Section title="Quick Answers">
      <p><strong>How do I place an order?</strong> Select your product, add to cart, and checkout.</p>
      <p><strong>How do I track my order?</strong> Tracking link is shared after shipping.</p>
      <p><strong>Can I cancel my order?</strong> Only before it’s shipped.</p>
      <p><strong>What payment methods are supported?</strong> UPI, cards, net banking.</p>
      <p><strong>Do I need an account?</strong> No, but it helps manage orders.</p>
    </Section>
  </div>
);

export const ShippingInfo = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Shipping Info</h1>
    <Section title="Details">
      <p>Processing Time: 1–2 business days</p>
      <p>Delivery Time: 3–6 business days</p>
      <p>Free shipping above ₹999</p>
      <p>₹50 fee below ₹999</p>
    </Section>
    <Section title="Notes">
      <p>Delays may happen during peak seasons.</p>
      <p>Ensure correct address details.</p>
      <p>Tracking shared after dispatch.</p>
    </Section>
  </div>
);

export const Returns = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Returns & Refunds</h1>
    <Section title="Policy">
      <p>Return within 7 days of delivery.</p>
      <p>Items must be unused with original packaging.</p>
    </Section>
    <Section title="Non-returnable">
      <p>Personal care</p>
      <p>Perishables</p>
      <p>Custom products</p>
    </Section>
    <Section title="Refunds">
      <p>Processed within 5–7 business days.</p>
      <p>Refund to original payment method.</p>
    </Section>
  </div>
);

export const PrivacyPolicy = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <Section title="What we collect">
      <p>Name, email, phone number</p>
      <p>Shipping & billing address</p>
      <p>Payment info (secured)</p>
    </Section>
    <Section title="Usage">
      <p>Process orders</p>
      <p>Improve experience</p>
      <p>Send updates</p>
    </Section>
    <Section title="Security">
      <p>We use encrypted systems to protect your data.</p>
    </Section>
    <Section title="Your Rights">
      <p>You can request access, update, or deletion anytime.</p>
    </Section>
  </div>
);

// Optional: export all as default for easy import
export default {
  Support,
  HelpCenter,
  ShippingInfo,
  Returns,
  PrivacyPolicy,
};
