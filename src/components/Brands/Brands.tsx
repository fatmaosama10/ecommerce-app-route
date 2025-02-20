import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const fetchProducts = async () => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  return response.data.data;
};

const Home = () => {
  const { addProductToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // ✅ تهيئة AOS مع التأثير لمرة واحدة
  }, []);

  async function AddToCart(id) {
    const data = await addProductToCart(id);
    if (data && data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Failed to add product to cart.");
    }
  }

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (error) {
    return <div className="text-red-500 text-center p-10">⚠️ Failed to load products. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="w-[90%] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h2 className="mb-8 text-3xl font-medium text-gray-500" data-aos="fade-up">
          All Brands
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product, index) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
              data-aos="fade-up"
              data-aos-delay={index * 100} // ✅ تأخير بسيط لكل عنصر
            >
              <div className="w-full h-56 flex justify-center items-center rounded-lg overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              </div>
              <h3 className="mt-4 font-bold text-green-500 text-lg">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ نافذة التفاصيل مع تأثير AOS */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          data-aos="zoom-in"
        >
          <div className="bg-white p-6 rounded-lg w-[400px] text-center shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{selectedProduct.name}</h2>
            <img src={selectedProduct.image} className="w-full h-48 object-cover my-4 rounded-md" alt={selectedProduct.name} />
            <p className="text-green-500 text-sm">Slug: {selectedProduct.slug}</p>
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-700 transition"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
