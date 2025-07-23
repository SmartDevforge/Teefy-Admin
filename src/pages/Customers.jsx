"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { api } from "../utils/api"
import { useToast } from "../components/ui/use-toast"
import Modal from "../components/Modal"
import { Eye } from "lucide-react"
import { LoadingPage } from "../components/ui/Loading"

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/users/all")
      setCustomers(response.data.data.users)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await api.get(`/users/all/${customerId}`)
      setSelectedCustomer(response.data.data)
      setIsModalOpen(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customer details",
        variant: "destructive",
      })
    }
  }
  if (isLoading) {
    return (
      <LoadingPage />
    )
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>Manage customer information and view order history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell className="font-medium">{customer.firstname + " " + customer.lastname}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button className="text-black" variant="outline" size="sm" onClick={() => fetchCustomerDetails(customer._id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Customer Details">
        {selectedCustomer && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <p className="text-sm text-gray-600">Name: {selectedCustomer.firstname + " " + selectedCustomer.lastname}</p>
                <p className="text-sm text-gray-600">Email: {selectedCustomer.email}</p>
                <p className="text-sm text-gray-600">Phone: {selectedCustomer.phoneNumber}</p>
              </div>
              <div>
                <h4 className="font-semibold">Account Information</h4>
                {/* <p className="text-sm text-gray-600">Total Orders: {selectedCustomer.totalOrders}</p> */}
                <p className="text-sm text-gray-600">
                  Role: {selectedCustomer.role}
                </p>
                <p className="text-sm text-gray-600">
                  Member Since: {new Date(selectedCustomer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              {selectedCustomer?.shippingAddress
                ? (
                  <>
                    <h4 className="font-semibold">Shipping Address</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p><span className="font-medium">Street:</span> {selectedCustomer?.shippingAddress?.street || "N/A"}</p>
                        <p><span className="font-medium">Apartment:</span> {selectedCustomer?.shippingAddress?.apartment || "N/A"}</p>
                        <p><span className="font-medium">City:</span> {selectedCustomer?.shippingAddress?.city || "N/A"}</p>
                        <p><span className="font-medium">County:</span> {selectedCustomer?.shippingAddress?.county || "N/A"}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Postcode:</span> {selectedCustomer?.shippingAddress?.postcode || "N/A"}</p>
                        <p><span className="font-medium">Country:</span> {selectedCustomer?.shippingAddress?.country || "N/A"}</p>
                        <p><span className="font-medium">Phone:</span> {selectedCustomer?.shippingAddress?.phone || "N/A"}</p>
                      </div>
                    </div>
                  </>
                )
                : <p>No shipping address provided.</p>
              }
            </div>


            {/* {selectedCustomer.orders && selectedCustomer.orders.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Order History</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCustomer.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id.slice(-6)}</TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )} */}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Customers
