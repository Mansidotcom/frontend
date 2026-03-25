import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import userLogo from "../../assets/user.png"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { setUser } from "@/redux/userSlice"

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: userId } = useParams()

  const [updateUser, setUpdateUser] = useState(null)
  const [file, setFile] = useState(null)

  const accessToken = localStorage.getItem("accessToken")

  /* GET USER DETAILS */
  const getUserDetails = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")

      const res = await axios.get(
        `http://localhost:8000/api/v1/user/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        setUpdateUser(res.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (userId) {
      getUserDetails()
    }
  }, [])

  {/*Input change*/ }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* IMAGE CHANGE  */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setUpdateUser((prev) => ({
      ...prev,
      profilePic: URL.createObjectURL(selectedFile),
    }))
  }

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("firstname", updateUser.firstname)
      formData.append("lastname", updateUser.lastname)
      formData.append("email", updateUser.email)
      formData.append("phoneNo", updateUser.phoneNo || "")
      formData.append("address", updateUser.address || "")
      formData.append("city", updateUser.city || "")
      formData.append("zipCode", updateUser.zipCode || "")

      if (file) {
        formData.append("profilePic", file)
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
        localStorage.setItem("user", JSON.stringify(res.data.user))
        navigate(-1)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update profile")
    }
  }

  /* LOADING GUARD  */
  if (!updateUser) return null

  return (
    <div className="pt-20 pl-50 min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col items-center min-h-screen">
          <div className="flex items-center gap-6 mb-6">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft />
            </Button>
            <h1 className="font-bold text-2xl text-gray-800">
              Update Profile
            </h1>
          </div>

          <div className="w-full flex gap-10 justify-center items-start max-w-2xl">
            {/* PROFILE IMAGE */}
            <div className="flex flex-col items-center">
              <img
                src={updateUser.profilePic || userLogo}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
              />
              <Label className="mt-2 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-1 w-40 ">
                Change Picture
                <Input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-5 rounded-lg bg-white">
              <div className="grid grid-col-2  gap-4">

                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="enter your firstname"
                    name="firstname"
                    value={updateUser.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="enter your lastname"
                    name="lastname"
                    value={updateUser.lastname}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={updateUser.email} disabled />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    placeholder="enter your email"
                    name="phoneNo"
                    value={updateUser.phoneNo}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    placeholder="enter your address"
                    name="address"
                    value={updateUser.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input
                      type="text"
                      placeholder="enter your city"
                      name="city"
                      value={updateUser.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label>Zip Code</Label>
                    <Input
                      type="text"
                      placeholder="enter your zipCode"
                      name="zipCode"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                    />
                  </div> 
                </div>
                <div className="flex gap-3 items-center">
                 <Label className='block text-sm font-medium'> Role :</Label>
                  <RadioGroup 
                  onValueChange={(value)=>setUpdateUser({...updateUser, role:value})}
                  value={updateUser?.role} 
                  className='flex items-center'>
                   <div className="flex items-center space-x-2">
                   <RadioGroupItem  value="user" id="user" />
                   <Label htmlFor="user">User</Label>
                   </div>

                    <div className="flex items-center space-x-2">
                   <RadioGroupItem  value="admin" id="admin" />
                   <Label htmlFor="admin">Admin</Label>
                   </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="bg-pink-600 text-white w-full">
                  Update Profile
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
