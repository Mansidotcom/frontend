import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Edit, Search, Trash2 } from "lucide-react"
import ImageUpload from "@/components/ImageUpload"
import { setProducts } from "@/redux/productSlice"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const AdminProduct = () => {
  const { products } = useSelector((store) => store.product)
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem("accessToken")
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [editProduct, setEditProduct] = useState(null)

  let filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    )
  }

  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    )
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setEditProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("productName", editProduct.productName)
    formData.append("productDesc", editProduct.productDesc)
    formData.append("productPrice", editProduct.productPrice)
    formData.append("category", editProduct.category)
    formData.append("brand", editProduct.brand)

    // existing images
    const existingImages = editProduct.productimg
      .filter((img) => !(img instanceof File))
      .map((img) => img.public_id)

    formData.append("existingImages", JSON.stringify(existingImages))

    // new images
    editProduct.productimg
      .filter((img) => img instanceof File)
      .forEach((file) => formData.append("files", file))

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/products/update/${editProduct._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      if (res.data.success) {
        toast.success("Product updated successfully")

        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p
        )
        dispatch(setProducts(updatedProducts))
        setEditProduct(null)
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Update failed")
    }
  }

  const deleteProducthandler = async (productId) => {
    try {
      const remainingProducts = products.filter((product) => product._id !== productId)
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/products/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setProducts(remainingProducts))
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pl-[350px] py-20 pr-20 min-h-screen bg-gray-100 flex flex-col gap-4">
      {/* top bar */}
      <div className="flex justify-between">
        <div className="relative bg-white rounded-lg">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product..." className="w-[400px]" />

          <Search
            className="absolute right-3 top-3 text-gray-500" />
        </div>

        <Select
          onValueChange={(value) => setSortOrder(value)}>

          <SelectTrigger className="w-[200px] bg-white">
            
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            position="popper"
            align="start"
            className="z-50"
          >
            <SelectItem value="lowToHigh">Low to High</SelectItem>
            <SelectItem value="highToLow">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* product list */}

      {
        filteredProducts.map((product) => (
          <Card key={product._id}>
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex gap-3 items-center">
                {product.productimg?.length > 0 && (
                  <img
                    src={product.productimg[0].url}
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                )}
                <h1 className="font-bold">{product.productName}</h1>
              </div>

              <h1 className="font-semibold">₹ {product.productPrice}</h1>

              <div className="flex gap-3">
                {/* EDIT */}
                <Dialog open={open} onChange={setOpen}>
                  <DialogTrigger asChild>
                    <Edit
                      className="text-green-500 cursor-pointer"
                      onClick={() => {
                        setOpen(true)
                        setEditProduct({
                          ...product,
                          productImg: product.productimg || [],
                        })
                      }}
                    />


                  </DialogTrigger>

                  {editProduct && (
                    <DialogContent className="max-w-[550px] max-h-[90vh] overflow-auto bg-gray-50 ">
                      <form onSubmit={handleSave}>
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription>
                            Update product details
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-2">
                          <Label>Name</Label>
                          <Input
                            name="productName"
                            value={editProduct.productName}
                            onChange={handleChange}
                          />

                          <Label>Price</Label>
                          <Input
                            type="number"
                            name="productPrice"
                            value={editProduct.productPrice}
                            onChange={handleChange}
                          />

                          <Label>Brand</Label>
                          <Input
                            name="brand"
                            value={editProduct.brand}
                            onChange={handleChange}
                          />

                          <Label>Category</Label>
                          <Input
                            name="category"
                            value={editProduct.category}
                            onChange={handleChange}
                          />

                          <Label>Description</Label>
                          <Textarea
                            name="productDesc"
                            value={editProduct.productDesc}
                            onChange={handleChange}
                          />

                          {editProduct && (
                            <ImageUpload
                              productData={editProduct}
                              setProductData={setEditProduct}
                            />
                          )}


                        </div>

                        <DialogFooter className="mt-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleChange} type="submit" variant="outline">Save chnages</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>

                {/* DELETE */}

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 className="text-red-600 cursor-pointer" />
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-gray-100 text-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-600">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteProducthandler(product._id)} className="bg-red-600 hover:bg-red-700">
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>


              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default AdminProduct
