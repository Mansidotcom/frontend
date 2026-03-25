import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();              // 
  const [status, setStatus] = useState("Verifying..."); // 
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/verify/${token}`
      );

      if (res.data.success) {
        setStatus("Email Verification Successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setStatus("Verification failed or link expired");
    }
  };


    useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;