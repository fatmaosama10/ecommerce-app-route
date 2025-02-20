import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { Products, numOfItems, removeProductFromCart, clearCart, addProductToCart } = useContext(CartContext);

  const totalPrice = Products?.reduce((acc, item) => acc + item.price * item.count, 0) || 0;

  const incrementProductCount = (productId) => {
    addProductToCart(productId); 
  };

  const decrementProductCount = (productId) => {
    const product = Products.find(item => item.product.id === productId);
    if (product && product.count > 1) {
      removeProductFromCart(productId); 
      addProductToCart(productId); 
    }
  };

  return (
    <main className="container px-4 mx-auto overflow-hidden">
      <section className="xl:mx-24 px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-500">Shopping Cart</h2>
          <button 
            className="hover:bg-red-700 focus:ring-red-300 px-4 py-2 font-semibold text-white bg-red-500 rounded-lg"
            onClick={clearCart}
          >
            Clear All
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between border-b pb-4 mb-4 text-2xl text-gray-500">
          <h3>
            Total Price: <span className="font-bold text-green-500">{totalPrice} EGP</span>
          </h3>
          <h3>
            Total Items: <span className="font-semibold text-green-500">{numOfItems}</span>
          </h3>
        </div>

        <div className="rounded-xl p-4 my-4" style={{ boxShadow: "rgba(0, 0, 0, 0.2) 12px 12px 26px, rgba(255, 255, 255, 0.6) -12px -12px 26px" }}>
          {Products?.map((item, idx) => (
            <div key={idx} className="sm:flex-row flex flex-col items-center justify-between gap-8 mb-4">
              <div className="flex items-center m-2">
                <img className="w-28 mr-3" src={item.product.imageCover} alt={item.product.title} />
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-500">{item.product.title}</h3>
                  <h4 className="mb-2 font-bold text-green-500">{item.price} EGP</h4>
                  <div className="flex">
                    <button 
                      className="text-red-600 flex items-center"
                      onClick={() => removeProductFromCart(item.product.id)}
                    >
                      <svg viewBox="0 0 24 24" className="text-1xl text-red-600 mr-1" width="20" height="20" fill="currentColor">
                        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button className="hover:bg-green-500 hover:text-white border-2 border-green-500 px-4 py-2 rounded-lg" onClick={() => incrementProductCount(item.product.id)}>+</button>
                <span className="mx-4 text-base font-medium">{item.count}</span>
                <button className="hover:bg-green-500 hover:text-white border-2 border-green-500 px-4 py-2 rounded-lg" onClick={() => decrementProductCount(item.product.id)}>-</button>
              </div>
            </div>
          ))}
        </div>

        <Link to="/payment" className="hover:bg-green-700 block w-full px-4 py-2 mt-8 text-white bg-green-500 rounded-lg text-center">
          Checkout
        </Link>
      </section>
    </main>
  );
}

export default Cart;
