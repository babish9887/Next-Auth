"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage(){
    const router=useRouter();
    let toasterId=""
    const [user, setUser]=React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [loading, setLoading]=React.useState(false);
    const onLogin = async()=>{
        try{
            setLoading(true);
            console.log("in function")
            toasterId= toast.loading('Loggin In');
            const response= await axios.post(`http://localhost:3000/api/users/login`,
            user);
            if(response.data.success){
                  setTimeout(()=>{
                        toast.success("Login Sucessful!",{
                              id: toasterId
                        })
                        router.push('/profile')
                  },1000)
            }
        }catch(e:any){
            toast.error(e.message, {id:toasterId})
        } finally{
            setLoading(false)
        }
    }
    return(
        <div className="flex flex-col items-center justify-center   p-8 border border-gray-400/50  rounded-lg">
            <h1>Login</h1>
            <hr />
            <input
             type="email"
            onChange={((e)=>setUser({...user, email:e.target.value }))}
            placeholder="email" />


            <input
             type="password"
            onChange={((e)=>setUser({...user, password:e.target.value }))}
            placeholder="password" />
            
            <Link href={'/forgotpassword'} className=" self-end mb-4">forgot password?</Link>
            <button className="hover:text-gray-300 hover:bg-gray-900/20"
            onClick={onLogin}>
               {loading? "Loggin In...":"Login "}
            </button>
            <p>Dont have a Account? <Link href='/signup' className="underline">Signup</Link></p>
        </div>
    )
}