// import { createContext, useState, useContext, ReactNode } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

// interface WishlistContextType {
//   wishlist: Product[];
//   addProductToWishlist: (product: Product) => void;
//   removeProductFromWishlist: (productId: number) => void;
// }

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// export const WishlistProvider = ({ children }: { children: ReactNode }) => {
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   const addProductToWishlist = (product: Product) => {
//     if (!wishlist.find((item) => item.id === product.id)) {
//       setWishlist([...wishlist, product]);
//     }
//   };

//   const removeProductFromWishlist = (productId: number) => {
//     setWishlist(wishlist.filter((item) => item.id !== productId));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addProductToWishlist, removeProductFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     throw new Error("useWishlist must be used within a WishlistProvider");
//   }
//   return context;
// };
