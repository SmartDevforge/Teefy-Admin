import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../components/ui/use-toast"
import Modal from "../components/Modal"
import { User, Lock, LogOut } from "lucide-react"
import axios from "axios"

const AdminProfile = () => {
  const { user, logout } = useAuth()
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePasswordChange = async () => {
    const api_key = import.meta.env.VITE_API_KEY || "your_api_key_here"
    const baseURL = import.meta.env.VITE_API_URL
    const token = localStorage.getItem("accessToken")

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
    }

    if (passwordData.newPassword.length < 6) {
      return toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
    }

    try {
      setIsLoading(true)
      await axios.put(
        `${baseURL}/users/password`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "x-api-key": api_key,
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast({
        title: "Success",
        description: "Password changed successfully",
      })

      setIsChangePasswordModalOpen(false)
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || error.message || "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Success",
      description: "Logged out successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Name</Label>
              <p className="text-lg font-medium">{`${user?.firstname || ""} ${user?.lastname || ""}`}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Role</Label>
              <p className="text-lg font-medium capitalize">{user?.role}</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account security and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setIsChangePasswordModalOpen(true)}
              className="w-full justify-start"
              variant="outline"
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button onClick={handleLogout} className="w-full justify-start" variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input
              id="oldPassword"
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, oldPassword: e.target.value }))}
              placeholder="Enter current password"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsChangePasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#068081] hover:bg-[#87dada]"
              onClick={handlePasswordChange}
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminProfile
// ""status" must be one of [pending, delivered, cancelled]"