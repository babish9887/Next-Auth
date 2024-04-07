"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function SignupPage(){
    const router=useRouter();
      let toastId="";
    const [user, setUser]=React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [loading, setLoading]=React.useState(false);
    const onSignup = async()=>{
        try{
            setLoading(true);
            console.log("in function")
            toastId=toast.loading("Signing Up")
            const response= await axios.post(`http://localhost:3000/api/users/signup`,
            user);
            if (response.data.success) {
                  setTimeout(()=>{
                      toast.success('Sign Up Successfull', {
                            id: toastId,
                          });
                        router.push('/login')
                  },1000)
              }
        }catch(e:any){
            toast.error(e.message, {id: toastId})

        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center p-8 border border-gray-400/50  rounded-lg">
            <h1>Signup</h1>
            <hr/>
            <input
             type="text"
            onChange={((e)=>setUser({...user, username:e.target.value }))}
            placeholder="username" />

            <input
             type="email"
            onChange={((e)=>setUser({...user, email:e.target.value }))}
            placeholder="email" />


            <input
             type="password"
            onChange={((e)=>setUser({...user, password:e.target.value }))}
            placeholder="password" />

            <button className="hover:text-gray-300 hover:bg-gray-900/20"
            onClick={onSignup}>
               {loading? "Signing Up...":"SignUp"}
            </button>
            <p>Already have an account? <Link href='/login' className="underline">Login</Link></p>
        </div>
    )
}