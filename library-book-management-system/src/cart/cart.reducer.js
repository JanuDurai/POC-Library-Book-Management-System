import { UPDATE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from "./cart.action";

function cartReducer(state = { items: []},action) {
    switch(action.type){
        case UPDATE_CART_ITEM : 
            const item = action.item;           
            if(item && item.quantity > 0) {
                const index = state.items.findIndex((product) => product.id===item.id);
                const newItems = [...state.items];
                if(index !== -1) {
                    newItems[index] = {...item}
                    return { ...state, items: newItems}
                } else
                    newItems.push({...item})    
                return { ...state, items: newItems}
             } else {
                      const items = state.items.filter((product)=> product.id === item.id)                      
                      return { ...state, items }
             }
        case UPDATE_CART_ITEM_QUANTITY : 
            const quantity = action.quantity;
            const product = action.product;
            if(quantity === 0) {
                const items = state.items.filter((prod)=> prod.id !== product.id);
                return { ...state, items}
            } else {
                const index = state.items.findIndex((prod)=> prod.id === product.id);
                if(index !== -1){
                    const newItems = [...state.items];
                    const item = {...state.items[index], quantity};
                    newItems[index] = item;
                    return { ...state, items: newItems};
                }
            }
            return state;
        default: return state;     
    }    
}
export default cartReducer;