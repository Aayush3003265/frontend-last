import {
  FiTruck,
  FiShield,
  FiCreditCard,
  FiHeadphones,
  FiGift,
  FiRefreshCw,
} from "react-icons/fi";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Fast & Free Shipping",
      description:
        "Enjoy free delivery on all orders over $50. Same-day shipping for orders before 2PM.",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Payments",
      description:
        "Your transactions are 100% secure with our advanced encryption technology.",
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Flexible Payment",
      description:
        "Pay with credit cards, PayPal, or installment plans. We accept multiple payment methods.",
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Our customer service team is available round the clock to assist you with any queries.",
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Loyalty Rewards",
      description:
        "Earn points with every purchase and redeem them for discounts on future orders.",
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description:
        "Not satisfied? Return within 30 days for a full refund, no questions asked.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Why Shop With Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {
              "We're committed to providing the best shopping experience with these exclusive benefits"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-[#016EB7] dark:bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#016EB7] dark:text-blue-400 mb-2">
              10M+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Happy Customers
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#016EB7] dark:text-blue-400 mb-2">
              100K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              5-Star Reviews
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#016EB7] dark:text-blue-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Customer Support
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#016EB7] dark:text-blue-400 mb-2">
              30-Day
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Returns Policy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
