import React, { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"

import ImageUpload from "@/components/ImageUpload"
import { setProducts } from "@/redux/productSlice"

const AddProduct = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const accessToken = localStorage.getItem("accessToken")
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    brand: "",
    category: "",
    productImg: [],
  })

  // 🔹 handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 🔹 submit form
  const submitHandler = async (e) => {
    e.preventDefault()

    if (productData.productImg.length === 0) {
      toast.error("Please select at least one image")
      return
    }

    const formData = new FormData()
    formData.append("productName", productData.productName)
    formData.append("productPrice", productData.productPrice)
    formData.append("productDesc", productData.productDesc)
    formData.append("brand", productData.brand)
    formData.append("category", productData.category)

    productData.productImg.forEach((img) => {
      formData.append("files", img)
    })

    try {
      setLoading(true)
      const res = await axios.post(
        "http://localhost:8000/api/v1/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        dispatch(setProducts(res.data.products))
        toast.success(res.data.message)

        // reset form
        setProductData({
          productName: "",
          productPrice: "",
          productDesc: "",
          brand: "",
          category: "",
          productImg: [],
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to add product")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="pl-[350px] py-20 pr-10 bg-gray-200 min-h-screen">
      <Card className="max-w-3xl mx-auto">
        <form onSubmit={submitHandler}>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
            <CardDescription>
              Enter product details below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                placeholder="Ex - iPhone"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="productPrice"
                value={productData.productPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Brand</Label>
                <Input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  placeholder="Ex - Apple"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Ex - Mobile"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />
            </div>

            {/* 🔹 Image Upload */}
            <ImageUpload
              productData={productData}
              setProductData={setProductData}
            />


          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={loading}
              onClick={submitHandler}
              className="w-full mt-6 bg-pink-600">
              {
                loading ? <span className="flex gap-1 items-center"><Loader2 className='animate-spin' />Please Wait</span> : 'Add Product'
              }
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AddProduct
