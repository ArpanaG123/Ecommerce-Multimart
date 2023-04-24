import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems:[],
    totalAmount:0,
    totalQuantity:0

}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            state.totalQuantity++

            if(!existingItem){
                state.cartItems.push({
                    id:newItem.id,
                    productName:newItem.productName,
                    imgUrl:newItem.imgUrl,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price
                })
            }else{
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            } 
            state.totalAmount = state.cartItems.reduce((total,item) =>  total + Number(item.price)*Number(item.quantity),0)  
            
            console.log(state.totalQuantity);
            console.log(state.cartItems);
            console.log(newItem);
        },
        deleteItem:(state,action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)
    
            if(existingItem){
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.toatlQuantity = state.toatlQuantity - existingItem.quantity
            }

            state.totalAmount = state.cartItems.reduce((total,item) =>  total + Number(item.price)*Number(item.quantity),0)
    
        },
        clearCart:(state,action) => {
            state.cartItems = [];
            toast.success("Order Placed Successfully")

            state.totalAmount = 0;
        }
    },
    
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer