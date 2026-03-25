import { FlipHorizontal2Icon, ShoppingCart } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '@/redux/productSlice';



const ProductCard = ({ product, loading}) => {
  const { productimg = [], productPrice, productName } = product;
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const addToCart = async(productId)=>{
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cart/add`, {productId}, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        toast.success("product added to cart")
        dispatch(setCart(res.data.cart))
      }
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="w-full aspect-square overflow-hidden">
       {
        loading ? <Skeleton  className='w-full h-full rounded-lg'/>: <img
          src={productimg[0]?.url}
          alt={productName}
          onClick={()=>navigate(`/products/${product._id}`)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
       }
      </div>

      {
        loading ?
         <div className='px-2 space-y-2 my-2'>
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[200px] h-8" />
          
        </div> :<div className="px-2 space-y-1">
        <h1 className="font-semibold h-12 line-clamp-2">{productName}</h1>
        <h2 className="font-bold">₹ {productPrice}</h2>
        <Button onClick={() => addToCart(product._id)} className="bg-pink-600 mb-3 w-full"><ShoppingCart />Add to cart</Button>
      </div>
      }

    </div>
  );
};



export default ProductCard
