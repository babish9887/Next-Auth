"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function LoginPage(){
    const router=useRouter();
    const [buttonDisabled, setButtonDisabled]=React.useState(false)
    const [token, setToken]=useState("");
    const [password, setPassword]=useState({
      password:'',
      confirmPassword:""
    })

    const [loading, setLoading]=React.useState(false);
    const onLogin = async()=>{
        try{
            if(password.password!==password.confirmPassword) return ;
            setLoading(true);
            console.log("in function", token)
            const tp=password.password
            const response= await axios.post(`http://localhost:3000/api/users/resetpassword`,{
                  tp, token
            });
            if(response.status){
                  console.log(response)
            }
            router.push('/profile')
        }catch(e:any){
            console.log('Login failed', e.message)
        } finally{
            setLoading(false)
        }
    }


    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
  }, []);

    return(
        <div className="flex flex-col items-center justify-center  p-8 border border-gray-400/50  rounded-lg">
            <h1>{loading? "Processing": "Reset Password"}</h1>
            <hr />
            <input
            disabled={loading}
             type="password"
            onChange={((e)=>setPassword({...password, password:e.target.value }))}
            placeholder="password" />


            <input
            disabled={loading}
             type="password"
            onChange={((e)=>setPassword({...password, confirmPassword:e.target.value }))}
            placeholder="Confirm password" />

            <button 
            disabled={loading}
            onClick={onLogin}>
               {loading? "Submitting":" Submit"}
            </button>
            <Link href='/signup' className="underline">Go to Login </Link>
        </div>
    )
}