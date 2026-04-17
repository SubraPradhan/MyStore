import "bootstrap/dist/css/bootstrap.min.css";
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

const Helpcenter = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        Help Center
      </h1>

      <Section title="Quick Answers">
        <p>
          <strong>How do I place an order?</strong><br />
          Select your product, add it to cart, and proceed to checkout.
        </p>

        <p>
          <strong>How do I track my order?</strong><br />
          A tracking link will be shared after your order is shipped.
        </p>

        <p>
          <strong>Can I cancel my order?</strong><br />
          Yes, but only before it has been shipped.
        </p>

        <p>
          <strong>What payment methods are supported?</strong><br />
          UPI, debit/credit cards, and net banking.
        </p>

        <p>
          <strong>Do I need an account?</strong><br />
          No, but having one helps you manage orders easily.
        </p>
      </Section>

    </div>
  );
};

export default Helpcenter;