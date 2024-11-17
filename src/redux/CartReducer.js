import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "./CartActions";

const initialState = {
  items: JSON.parse(sessionStorage.getItem("cartItems")) || [], 
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      sessionStorage.setItem("cartItems", JSON.stringify(newItems));
      return { ...state, items: newItems };
    }

    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    case UPDATE_QUANTITY: {
      const updatedQuantityItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      sessionStorage.setItem("cartItems", JSON.stringify(updatedQuantityItems));
      return { ...state, items: updatedQuantityItems };
    }

    default:
      return state;
  }
};
