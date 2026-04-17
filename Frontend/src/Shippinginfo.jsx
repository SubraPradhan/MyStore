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

const Shippinginfo = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Shipping Information
      </h1>

      <Section title="Shipping Details">
        <p><strong>Processing Time:</strong> 1–2 business days</p>
        <p>🚚 <strong>Delivery Time:</strong> 3–6 business days</p>
        <p><strong>Free Shipping:</strong> On orders above ₹999</p>
        <p><strong>Shipping Fee:</strong> ₹50 for orders below ₹999</p>
      </Section>

      <Section title="Important Notes">
        <p>Delivery delays may occur during peak seasons or holidays.</p>
        <p>Please ensure your shipping address is accurate and complete.</p>
        <p>Tracking details will be shared after your order is dispatched.</p>
      </Section>

    </div>
  );
};

export default Shippinginfo;