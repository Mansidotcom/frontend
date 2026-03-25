import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


const ImageUpload = ({ productData, setProductData }) => {

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length) {
      setProductData(prev => ({
        ...prev,
        productImg: [...prev.productImg, ...files]
      }))

    }
  }

  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      productImg: prev.productImg.filter((_, i) => i !== index)
    }))

  }


  return (
    <div className="grid gap-2">
      <Label>Product Images</Label>

      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <Button variant="outline" type="button">
        <Label htmlFor="file-upload" className="cursor-pointer">
          Upload Images
        </Label>
      </Button>

      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          {productData.productImg.map((file, idx) => {
            const preview =
              file instanceof File ? URL.createObjectURL(file) : file?.url

            if (!preview) return null

            return (
              <Card key={idx} className="relative group overflow-hidden">
                <CardContent className="p-2">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/60 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
