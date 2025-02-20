import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import { useContext, useState } from "react"; // ✅ Added useState
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  
  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false); // ✅ Fixed variable name

  async function AddToCart() {
    setLoading(true);
    const data = await addProductToCart(id);
    if (data && data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Failed to add product to cart.");
    }
    setLoading(false);
  }

  // Fetch product details
  const { data, isLoading, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      return response.data.data;
    },
  });

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <i className="fa-solid fa-cart-shopping text-4xl text-green-400 animate-spin"></i>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">Failed to load product details.</div>;
  }

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-10">
      <div className="flex flex-col md:flex-row items-center gap-10 rounded-lg p-8">
        {/* Product Images */}
        <div className="md:w-1/4 flex justify-center m-20">
          {data.images?.length > 1 ? (
            <Slider {...settings} className="w-full max-w-md">
              {data.images.map((img, index) => (
                <div key={index} className="flex justify-center">
                  <img src={img} className="w-full rounded-lg" alt={`Product Image ${index + 1}`} />
                </div>
              ))}
            </Slider>
          ) : (
            <img src={data.imageCover} className="w-full max-w-md rounded-lg shadow-md" alt={data.title} />
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-3/4 space-y-4">
          <h3 className="mb-4 text-2xl font-semibold">{data.title}</h3>
          <p className="mb-4 font-medium">
            Material: {data.material || "Unknown"} <br />
            Colour: {data.color || "Multicolour"} <br />
            Department: {data.department || "Women"}
          </p>
          <h4 className="mb-4 text-lg font-medium text-green-500">{data.category?.name || "Unknown"}</h4> {/* ✅ Fixed */}
          <div className="flex items-center justify-around mb-8">
            <h4 className="text-lg font-semibold">
              {data.priceAfterDiscount ? (
                <>
                  <span className="line-through">{data.price} EGP</span>
                  <span>{data.priceAfterDiscount} EGP</span>
                </>
              ) : (
                `${data.price} EGP`
              )}
            </h4>
            <p className="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="mr-1 text-yellow-400"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
              </svg>
              {data.ratingsAverage || "4.8"}
            </p>
          </div>
          <button
            onClick={AddToCart}
            className="hover:bg-green-600 focus:ring-green-400 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-green-500 rounded-lg cursor-pointer"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
