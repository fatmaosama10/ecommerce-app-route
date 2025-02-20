import React from 'react';

const Wishlist = () => {
  return (
    <main className="container px-4 mx-auto overflow-hidden">
      <section className="xl:mx-24 px-4 py-12">
        <h2 className="mb-8 text-3xl font-semibold text-gray-500">Shopping Cart</h2>
        <div 
          className="rounded-xl p-4 my-4" 
          style={{ boxShadow: "rgba(0, 0, 0, 0.2) 12px 12px 26px, rgba(255, 255, 255, 0.6) -12px -12px 26px" }}
        >
          <div className="sm:flex-row sm:items-center flex flex-col justify-between gap-8">
            <div className="flex items-center">
              <img 
                className="w-28 mr-3" 
                src="https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg" 
                alt="Woman Shawl" 
              />
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-500">Woman Shawl</h3>
                <h4 className="mb-2 font-bold text-teal-500">149 EGP</h4>
                <div className="flex">
                  <svg 
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 24 24" 
                    className="text-[20px] cursor-pointer text-1xl text-red-600 relative top-[2px] mr-1" 
                    height="1em" 
                    width="1em" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
                  </svg>
                  <button className="text-red-600">Remove</button>
                </div>
              </div>
            </div>
            <div>
              <button className="hover:bg-teal-700 focus:ring-teal-300 whitespace-nowrap w-full px-4 py-2 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Wishlist;


