"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { api } from "../utils/api"
import { DollarSign, Package, TrendingUp, Users } from "lucide-react"
import { LoadingPage } from "../components/ui/Loading"

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [totalOrders, orderStatus, salesChart, topProducts] = await Promise.all([
          api.get("/orders/total"), // used 
          api.get("/orders/stats"), // used 
          api.get("/orders/analytics"), // used but not tested
          api.get("/products/top-selling"),
        ])
        setData({
          totalOrders: totalOrders.data.data.orderCount,
          orderStatus: orderStatus.data.data.pieData,
          salesChart: salesChart.data.data,
          topProducts: topProducts.data.data,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        throw new Error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboardData()
  }, [])
if (isLoading) {
    return (
      <LoadingPage />
    )
  }
  const orderStatus = {
    pending: 0,
    delivered: 0,
    canceled: 0,
  };

  data?.orderStatus?.forEach(item => {
    if (item._id === "pending") orderStatus.pending = item.count;
    if (item._id === "delivered") orderStatus.delivered = item.count;
    if (item._id === "canceled") orderStatus.canceled = item.count;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ 2.8%</div>
            <p className="text-xs text-muted-foreground">Today's revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <p className="text-xs text-muted-foreground">Orders completed this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data ? data.totalOrders : 0}
            </div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Analysis</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-yellow-600">Pending:</span>
                <span>{orderStatus.pending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Delivered:</span>
                <span>{orderStatus.delivered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">Canceled:</span>
                <span>{orderStatus.canceled}</span>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Orders and revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.salesChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>


           {/* Top Selling Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products by units sold and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.topProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <img className="w-[45px] h-[45px] rounded-lg" src={product.image} />
                  </TableCell>
                  <TableCell className="font-medium">{product.productName}</TableCell>
                  <TableCell>{product.salesData.quantitySold}</TableCell>
                  <TableCell>${product.salesData.amountSold.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>

   
    </div>
  )
}

export default Dashboard
