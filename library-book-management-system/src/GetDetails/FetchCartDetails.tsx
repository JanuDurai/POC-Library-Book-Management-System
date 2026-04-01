import { useState } from "react";

/* To fetch cart items and return a function which fetch cart items and state variable holds the cart items */
function useCartItems() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [cartItems, setCartItems] = useState([]);
  const cartUrl = `${apiUrl}/cartItems`;
  const bookUrl = `${apiUrl}/bookDetails`;
  const newCartItems:any[] = [];
  const userId = localStorage.getItem("userId");

  /* api call to get cart items  */
  const getCartItems = async () => {
    const cart = await fetch(cartUrl);
    const response = await cart.json();
    const userCartItems = await response.filter(
      (data:any) => data.user_id === userId,
    );
    await userCartItems.map(async (item:any) => {
      const foundBookData = await fetch(`${bookUrl}/${item.product_id}`);
      const response = await foundBookData.json();
      newCartItems.push({
        product: response,
        quantity: item.product_quantity,
        cartId: item.id,
      });
    });
    setCartItems(newCartItems as any);
  };
  return [cartItems, getCartItems];
}

export default useCartItems;
