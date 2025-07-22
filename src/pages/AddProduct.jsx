import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { api } from "../utils/api"
import { useToast } from "../components/ui/use-toast"
import { Upload, X } from "lucide-react"
import axios from "axios"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    noOfUnits: '',
    price: '',
    description: '',
    categoryId: "67e2000f8740ecc07f3f2826",
  });

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleImageChange = (file) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('productName', formData.productName);
      form.append('quantity[piece]', Number(formData.quantity));
      form.append('noOfQuantity', Number(formData.noOfUnits));
      form.append('noOfUnits', Number(formData.noOfUnits));
      form.append('price', Number(formData.price));
      form.append('categoryId', formData.categoryId);
      form.append('description', formData.description);
      if (image) {
        form.append('image', image);
      }
      const api_key = import.meta.env.VITE_API_KEY || "your_api_key_here";
      const baseURL = import.meta.env.VITE_API_URL
      const token = localStorage.getItem("accessToken")
      const response = await axios.post(`${baseURL}/products/new`, form, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': api_key,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: "Success",
        description: "Product added successfully",
      });

      // Optionally reset form
      setImage(null);
      setFormData({
        productName: "",
        quantity: "",
        noOfUnits: "",
        price: "",
        description: "",
      });
      

    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to add product",
        variant: "destructive",
      });
      console.error('Error:', err.response?.data.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Fill in the details to add a new product to your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label>Product Image</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full h-48 object-cover mx-auto rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 max-w-[100px]"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Drop an image here, or <span className="text-[#068081]">browse</span>
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="unit">Unit *</Label>
                <Input
                  id="noOfUnits"
                  name="noOfUnits"
                  type="number"
                  value={formData.noOfUnits}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/products")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#068081] hover:bg-[#d1f3f2] hover:text-[#068081] " disabled={isLoading}>
                {isLoading ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct
