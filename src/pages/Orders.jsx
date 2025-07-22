"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { api } from "../utils/api"
import { useToast } from "../components/ui/use-toast"
import Modal from "../components/Modal"
import { Eye } from "lucide-react"
import { LoadingPage } from "../components/ui/Loading"
import axios from "axios"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders(activeTab)
  }, [activeTab])

  const fetchOrders = async (status) => {
    setIsLoading(true)
    try {
      const params = status === "all" ? {} : { status }
      const response = await api.get("/orders/total", { params })
      setOrders(response.data.data.orders)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // const updateOrderStatus = async (orderId, newStatus) => {
  //   try {
  //     // /v1
  //     // await api.patch(` /orders/update/${orderId}`, { status: newStatus })
  //           await api.patch(`/orders/update/6818d06b66339eb69bc4f743`, { status: newStatus })

  //     console.log(newStatus)
  //     setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  //     toast({
  //       title: "Success",
  //       description: "Order status updated successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update order status",
  //       variant: "destructive",
  //     })
  //     console.log(error)
  //   }
  // }


  const updateOrderStatus = async (orderId, newStatus) => {
    const api_key = import.meta.env.VITE_API_KEY || "your_api_key_here";
    const baseURL = import.meta.env.VITE_API_URL
    const token = localStorage.getItem("accessToken")
    try {
      await axios.put(
        `${baseURL}/orders/update/${orderId}`,
        { status: newStatus },
        {
          headers: {
            "x-api-key": api_key,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };


  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      canceled: "bg-red-100 text-red-800",
    }

    return <Badge className={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const openOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all"
                  ? "All Orders"
                  : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders`}
              </CardTitle>
              <CardDescription>Manage and track customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">#{order._id.slice(-6)}</TableCell>
                      <TableCell>{order.userId?.firstname + " " + order.userId?.lastname}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => openOrderDetails(order)}>
                          <Eye className="w-4 h-4" />

                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Order Details">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="font-semibold">Order Information</h4>
                <p className="text-sm text-gray-600">Order ID: #{selectedOrder._id.slice(-6)}</p>
                <p className="text-sm text-gray-600">Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Total: ${selectedOrder.total.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="font-semibold">Customer Information</h4>
                <p className="text-sm text-gray-600">Name: {selectedOrder?.userId?.firstname + " " + selectedOrder.userId?.lastname}</p>

                <p className="text-sm text-gray-600">Email: {selectedOrder.userId?.email}</p>
                <p className="text-sm text-gray-600">Phone: {selectedOrder?.userId?.phoneNumber}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Delivery Address</h4>
              <div className="text-sm text-gray-700">
                {selectedOrder?.shippingAddress
                  ? (
                    <>
                      <div className="text-sm text-gray-800 leading-relaxed space-y-1 flex ">
                        <div>
                          <p><span className="font-medium">Street:</span> {selectedOrder?.shippingAddress?.street || "N/A"}</p>
                          <p><span className="font-medium">Apartment:</span> {selectedOrder?.shippingAddress?.apartment || "N/A"}</p>
                          <p><span className="font-medium">City:</span> {selectedOrder?.shippingAddress?.city || "N/A"}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">County:</span> {selectedOrder?.shippingAddress?.county || "N/A"}</p>
                          <p><span className="font-medium">Postcode:</span> {selectedOrder?.shippingAddress?.postcode || "N/A"}</p>
                          <p><span className="font-medium">Country:</span> {selectedOrder?.shippingAddress?.country || "N/A"}</p>
                          <p><span className="font-medium">Phone:</span> {selectedOrder?.shippingAddress?.phone || "N/A"}</p>
                        </div>
                      </div>

                    </>
                  )
                  : <p>No shipping address provided.</p>
                }
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Order Items</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell> {item.productId.productName}</TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${item.price * item.qty.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Update Status</h4>
              <Select
                value={selectedOrder.status}
                onValueChange={(value) => updateOrderStatus(selectedOrder._id, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Orders
// ""status" must be one of [pending, delivered, cancelled]"