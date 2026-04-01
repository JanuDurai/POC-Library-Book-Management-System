import { createStore } from "redux";
import cartReducer from "./cart.reducer";

const store = createStore(cartReducer);

export default store;