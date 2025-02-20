import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import axios from 'axios';

const Payment = () => {
  const { cartId } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");

  async function CashOrder(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const x = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city,
      },
    };
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, x, {
        headers: {
          token: localStorage.getItem("tkn")
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="container px-4 mx-auto overflow-hidden">
      <section className="lg:mx-24 lg:px-8 px-2 py-12">
        <h2 className="mb-8 text-3xl font-semibold text-gray-500">Checkout</h2>
        <form className="select-none">
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="phone">Phone</label>
            </div>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              id="phone"
              placeholder="Phone Number..."
              className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="city">City</label>
            </div>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="city"
              placeholder="Write Your City..."
              className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="address">Details</label>
            </div>
            <textarea
              onChange={(e) => setDetails(e.target.value)}
              id="address"
              placeholder="Write Your Address Here..."
              cols="30"
              rows="3"
              maxLength="200"
              className="focus:shadow-input-focus focus:outline-none w-full px-4 py-2 font-medium border border-gray-300 border-solid rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center mb-4">
              <input id="cash" type="radio" className="w-5 h-5" name="payment" value="cash" />
              <label htmlFor="cash" className="ms-2 text-lg font-bold text-green-600">Cash Payment</label>
            </div>
            <div className="flex items-center">
              <input id="online" type="radio" className="w-5 h-5" name="payment" value="online" />
              <label htmlFor="online" className="ms-2 text-lg font-bold text-green-600">Online Payment</label>
            </div>
            <button
              onClick={CashOrder}
              type="submit"
              className="hover:bg-green-700 focus:ring-green-300 disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-green-500 rounded-lg cursor-pointer"
            >
              Continue with Payment
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Payment;

