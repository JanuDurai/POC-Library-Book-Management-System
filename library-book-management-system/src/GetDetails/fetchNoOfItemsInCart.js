import { useState } from "react";

/* To find the number of books in cart */
function FetchNoOfItemsInCart() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const cartUrl = `${apiUrl}/cartItems`;
  const [cartLength, setCartLength] = useState(0);
  const userId = localStorage.getItem("userId");

  const fetchCartItemsLength = async () => {
    const fetchCartItems = await fetch(cartUrl);
    const fetchedData = await fetchCartItems.json();
    const userCartItem = await fetchedData.filter(
      (data) => data.user_id === userId,
    );
    // console.log(fetchedData,userCartItem);
    
    const cartLength = userCartItem.length;
    setCartLength(cartLength);
    // console.log(cartLength);
  };

  return { cartLength, fetchCartItemsLength };
}

export default FetchNoOfItemsInCart;
