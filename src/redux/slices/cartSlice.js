import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store cart items
  },
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(
        item =>
          item.title === action.payload.title &&
          item.size === action.payload.size,
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.items.push({...action.payload, quantity: 1}); // Add new item
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const {id, quantity} = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const {addItemToCart, removeItemFromCart, updateQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;
