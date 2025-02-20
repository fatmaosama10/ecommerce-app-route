import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext/CartContext";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const fetchProducts = async () => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return response.data.data;
};

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function AddToCart(id) {
    const data = await addProductToCart(id);
    if (data && data.status === "success") {
      toast.success(data.message);
    } else {
      
    }
  }

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <i className="fa-solid fa-cart-shopping loading-icon text-4xl animate-spin"></i>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">⚠️ Failed to load products. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen">

      <div className="w-[90%] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h2 className="mb-8 text-3xl font-medium text-gray-500" data-aos="zoom-in">ِAll Products</h2>

        <div className="flex flex-wrap justify-center">
          {products?.map((product, index) => (
            <motion.div 
              key={product._id} 
              className="bg-transparent p-9 rounded-2xl shadow-2xl w-[330px] m-7"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <Link to={`/productDetails/${product._id}`} className="block" data-aos="flip-left">
                <div className="w-full h-96 flex justify-center items-center rounded-lg overflow-hidden" data-aos="zoom-in">
                  <img src={product.imageCover} className="w-full h-full object-cover" alt={product.title} />
                </div>
                <h3 className="mt-6 font-bold text-green-500 text-lg" data-aos="flip-right">{product.category?.name || "Unknown Category"}</h3>
                <h3 className="mt-3 font-semibold text-gray-800 text-lg truncate" data-aos="slide-up">{product.title}</h3>

                <div className="mt-6 flex justify-between items-center" data-aos="zoom-out">
                  {product.priceAfterDiscount ? (
                    <>
                      <span className="line-through text-gray-500" data-aos="flip-down">{product.price} EGP</span>
                      <span className="text-red-500 font-bold" data-aos="zoom-in">{product.priceAfterDiscount} EGP</span>
                    </>
                  ) : (
                    <span className="font-bold text-gray-800">{product.price} EGP</span>
                  )}
                </div>

                <div className="flex mt-2" data-aos="fade-in">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="text-yellow-400 mx-2 mt-1" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                  </svg>
                  {product.ratingsAverage ?? "4.8"}
                </div>
              </Link>
              <button onClick={() => AddToCart(product.id)} className="hover:bg-green-600 m-5 focus:ring-green-400 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-green-500 rounded-lg cursor-pointer" data-aos="flip-up">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
