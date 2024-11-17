import { createStore, combineReducers } from "redux";
import { cartReducer } from "./CartReducer"; 

// Combine reducers (useful if you have multiple reducers)
const rootReducer = combineReducers({
  cart: cartReducer, // Add cart reducer under "cart"
});

// Create the Redux store
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools
);


export default store; // Default export
