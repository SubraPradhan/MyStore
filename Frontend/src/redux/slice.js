import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {

    addItem: (state, action) => {

      const item = state.find(i => i.id === action.payload.id)

      if(item){
        item.quantity += 1
      }
      else{
        state.push({...action.payload, quantity:1})
      }

    },

    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },

    increaseQty:(state,action)=>{
      const item = state.find(i=>i.id===action.payload)
      if(item){
        item.quantity += 1
      }
    },

    decreaseQty:(state,action)=>{
      const item = state.find(i=>i.id===action.payload)
      if(item && item.quantity>1){
        item.quantity -= 1
      }
    },
      clearCart: () => {
      return []
      }
  }
})

export const {addItem,removeItem,increaseQty,decreaseQty,clearCart} = cartSlice.actions
export default cartSlice.reducer