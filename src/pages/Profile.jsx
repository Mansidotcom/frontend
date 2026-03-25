import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { setUser } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import userLogo from "@/assets/mahadev1.jpg"
import MyOrder from "./MyOrder";


const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //  FIX: userId Redux se
  const userId = user?._id;

  const [updateUser, setUpdateUser] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    profilePic: user?.profilePic || "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not found");
      return;
    } 

    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("firstname", updateUser.firstname);
      formData.append("lastname", updateUser.lastname);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);

      if (file) {
        formData.append("profilePic", file); // backend match
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        localStorage.setItem("user",JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to update profile");
    }
  };


  return (
    <div className="pt-20 min-h-screen bg-gray-100 px-4">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto">

        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              <h1 className="font-bold text-center py-6 text-xl md:text-2xl text-gray-800">Update Profile</h1>

              <div className="flex flex-col lg:flex-row gap-8 justify-center items-start p-6">
                {/* Profile picture */}
                <div className="flex flex-col items-center lg:items-start">
                  <img
                    src={updateUser.profilePic || userLogo}
                    alt="profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-500"
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded text-sm font-medium text-center w-full max-w-xs">
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

                {/* Profile form */}
                <form onSubmit={handleSubmit} className="flex-1 max-w-2xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">First Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter your firstname"
                        name="firstname"
                        value={updateUser.firstname}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Last Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter your lastname"
                        name="lastname"
                        value={updateUser.lastname}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        value={updateUser.email}
                        disabled
                        className="mt-1 bg-gray-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        name="phoneNo"
                        value={updateUser.phoneNo}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">City</Label>
                      <Input
                        type="text"
                        placeholder="Enter your city"
                        name="city"
                        value={updateUser.city}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Address</Label>
                      <Input
                        type="text"
                        placeholder="Enter your address"
                        name="address"
                        value={updateUser.address}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Zip Code</Label>
                      <Input
                        type="text"
                        placeholder="Enter your zip code"
                        name="zipCode"
                        value={updateUser.zipCode}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-2"
                    >
                      Update Profile
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
