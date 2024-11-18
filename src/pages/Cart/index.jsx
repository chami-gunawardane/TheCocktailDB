import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/CartActions";
import background from "../../assets/images/b 1.jpg";

const Cart = () => {
  // Retrieve cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items); 
  const dispatch = useDispatch();

  // Handle removing an item from the cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handle quantity changes
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(id, newQuantity));
    }
  };

  return (
    <div
      className="p-8 bg-gray-100 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute top-2 bg-black opacity-100"></div>

      <h1 className="text-2xl font-bold mb-4 text-center sm:text-center font-serif">
        Your Cart
      </h1>

      {cartItems && cartItems.length === 0 ? (
        <p className="text-black text-center font-serif">
          Your cart is empty. Add some items to get started!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-md rounded-md font-serif">
            <thead>
              <tr className="border-b border-black">
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-black">
                  <td className="p-4 flex items-center gap-4 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item.description}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-white rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-white rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
