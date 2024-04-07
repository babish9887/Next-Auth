"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function ForgotPasswordPage(){
    const router=useRouter();
    const [buttonDisabled, setButtonDisabled]=React.useState(false)
    const [email, setEmail]=useState("")

    const [loading, setLoading]=React.useState(false);


    const onLogin = async () => {
      try {
          setLoading(true);
          const toastId = toast.loading("Please wait!"); // Show loading toast
          console.log("in function");
          const response = await axios.post(`http://localhost:3000/api/users/forgotpassword`, { email });
          console.log(response.data);
          if (response.data.success) {
              setTimeout(()=>{
                  toast.success('Check Your Email!', {
                        id: toastId,
                      });
              },1000)
          }
      } catch (e:any) {
            toast.error(e.message)

      } finally {
          setLoading(false);
      }
  }
    return(
        <div className="flex flex-col items-center justify-center   p-8 border border-gray-400/50  rounded-lg">
            <h1>Forgot password</h1>
            <hr />
            <input
            disabled={loading}

             type="email"
            onChange={((e)=>setEmail(e.target.value ))}
            placeholder="email" />

            <button 
            disabled={loading}
            onClick={onLogin}>
               {loading? "Submitting":"Submit"}
            </button>
            <Link href='/login' className="underline">Go back to Login</Link>
        </div>
    )
}