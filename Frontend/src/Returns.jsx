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

const Returns = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Returns & Refunds
      </h1>

      <Section title="Return Policy">
        <p>
          <p>🔁 Return within 7 days</p>
        </p>
        <p>
          Items must be <strong>unused</strong> and in their original packaging.
        </p>
      </Section>

      <Section title="Non-Returnable Items">
        <p>Personal care products</p>
        <p>Perishable goods</p>
        <p>Customized or made-to-order products</p>
      </Section>

      <Section title="Refund Process">
        <p>
          Refunds are processed within <strong>💰 Refund in 5–7 days</strong>.
        </p>
        <p>
          Amount will be credited to your <strong>original payment method</strong>.
        </p>
      </Section>
      <div className="bg-red-100 text-red-600 p-4 rounded">
        Note: Some items are non-returnable.
      </div>

    </div>
  );
};

export default Returns;