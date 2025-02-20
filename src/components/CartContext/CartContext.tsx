import { createContext, useReducer, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

const initialState = {
  Products: [],
  numOfItems: 0,
  totalPrice: 0,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cartId, setCartId] = useState(null);
  const token = localStorage.getItem("tkn");

  const getUseCart = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      });
      dispatch({
        type: 'SET_CART',
        payload: {
          products: data.data.products,
          numOfItems: data.numOfCartItems,
          totalPrice: data.data.totalCartPrice,
        },
      });
      setCartId(data?.data?._id); // تم تصحيح هذه السطر
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [token]);

  const addProductToCart = useCallback(async (id) => {
    if (!token) return;
    try {
      const existingProduct = state.Products.find(item => item.product.id === id);
      if (existingProduct) {
        dispatch({
          type: 'UPDATE_PRODUCT_COUNT',
          payload: { productId: id, count: existingProduct.count + 1 },
        });
      } else {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { productId: id },
          { headers: { token } }
        );
        dispatch({
          type: 'SET_CART',
          payload: {
            products: data.data.products,
            numOfItems: data.numOfCartItems,
            totalPrice: data.data.totalCartPrice,
          },
        });
        toast.success("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.response ? error.response.data : error.message);
    }
  }, [token, state.Products]);

  const removeProductFromCart = useCallback(async (productId) => {
    if (!token) return;
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token } }
      );
      dispatch({
        type: 'SET_CART',
        payload: {
          products: data.data.products,
          numOfItems: data.numOfCartItems,
          totalPrice: data.data.totalCartPrice,
        },
      });
      toast.success("Product removed from cart!");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product.");
    }
  }, [token]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info("Cart cleared!");
  }, []);

  useEffect(() => {
    getUseCart();
  }, [getUseCart]);

  return (
    <CartContext.Provider value={{ ...state, addProductToCart, removeProductFromCart, clearCart, cartId }}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        Products: action.payload.products,
        numOfItems: action.payload.numOfItems,
        totalPrice: action.payload.totalPrice,
      };
    case 'CLEAR_CART':
      return initialState;
    case 'UPDATE_PRODUCT_COUNT':
      const updatedProducts = state.Products.map(product =>
        product.product.id === action.payload.productId
          ? { ...product, count: action.payload.count }
          : product
      );
      return {
        ...state,
        Products: updatedProducts,
        numOfItems: updatedProducts.reduce((acc, item) => acc + item.count, 0),
        totalPrice: updatedProducts.reduce((acc, item) => acc + item.price * item.count, 0),
      };
    default:
      return state;
  }
};

export default CartContextProvider;

