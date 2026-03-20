export const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
export const UPDATE_CART_ITEM_QUANTITY = "cart/UPDATE_CART_ITEM_QUANTITY";

export const updateCartItems = (items)=>({ 
    type: UPDATE_CART_ITEM,
    items
});

export const updateCartItemQuantity = (product,quantity) =>({
    type: UPDATE_CART_ITEM_QUANTITY,
    product,
    quantity,
})

