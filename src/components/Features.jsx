import { Headphones, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          <div className="flex items-center space-x-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 md:h-14 md:w-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-gray-500 text-sm md:text-base">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 md:h-14 md:w-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Secure Payment</h3>
              <p className="text-gray-500 text-sm md:text-base">100% secure transactions</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 md:h-14 md:w-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Headphones className="h-6 w-6 md:h-7 md:w-7 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">24/7 Support</h3>
              <p className="text-gray-500 text-sm md:text-base">Always here to help</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Features;