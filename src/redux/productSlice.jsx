import Products from "@/pages/Products";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        cart:{
            items: [],
            totalPrice: 0,
        },
        addresses:[],
        selectedAddress:null //currently chosen address
    },
    reducers:{
        //actions
        setProducts:(state, action)=>{
            state.products = action.payload
        },
        setCart:(state, action)=>{
            state.cart = action.payload
        },

        // Address Management
        addAddress:(state, action)=>{
            if(!state.addresses)state.addresses= []
            state.addresses.push(action.payload)
        },

        setSelectedAddress:(state, action)=>{
            state.selectedAddress = action.payload
        },
        deleteAddress:(state,action)=>{
            state.addresses = state.addresses.filter((_, index)=>index !== action.payload)

            //Reset selectaddress it if was deleted
            if(state.selectedAddress === action.payload)
            {
                state.selectedAddress = null
            }
        }
    }
})

export const {setProducts, setCart, addresses, addAddress, setSelectedAddress, deleteAddress} = productSlice.actions;
export default productSlice.reducer;