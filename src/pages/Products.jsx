import React, { useEffect, useState, } from 'react'
import FilterSidebar from '@/components/FilterSidebar'
import ProductCard from '@/components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import axios from 'axios'
import { setProducts } from '@/redux/productSlice';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';




const Products = () => {
  const { products } = useSelector(state => state.product)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 9999999])
  const [sortOrder, setSortOrder] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dispatch = useDispatch();


  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getallproducts`);
      if (res.data.success) {
        setAllProducts(res.data.products)
      }
    }

    catch (error) {
      console.log(error, "hello");
      toast.error(error.response?.data?.message || "Something went wrong");
      dispatch(setProducts(res.data.products));
    }
    finally {
      setLoading(false);
    }
}

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter(p => p.brand === brand);
    }

    filtered = filtered.filter(
      p =>
        p.productPrice >= priceRange[0] &&
        p.productPrice <= priceRange[1]
    );

    if (sortOrder === "LowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "HighToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);


  useEffect(() => {
    getAllProducts()

  }, [])

  console.log(allProducts);


  return (
    <div className='p-4 md:p-20 pb-10'>
      <div className='max-w-7xl mx-auto flex gap-7'>
        {/* sidebar */}
        <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} md:relative absolute top-0 left-0 z-10 bg-white md:bg-transparent w-full md:w-auto`}>
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            brand={brand}              
            setBrand={setBrand}
            allProducts={allProducts}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* main product section */}
        <div className="flex flex-col flex-1 overflow-visible">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden bg-pink-500 text-white">
              <Filter className="mr-2" /> Filters
            </Button>
            <Select onValueChange={(value)=>setSortOrder(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                position="popper"
                align="start"
                className="z-50"
              >
                <SelectGroup>
                  <SelectItem value="LowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="HighToLow">Price: High to Low</SelectItem>
                </SelectGroup >
              </SelectContent>
            </Select>
          </div>
          {/* product grid */}

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
            {
              products.map((product) => {
                return <ProductCard key={product._id} product={product} loading={loading} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
