"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
function ProfilePage() {
  const [data, setData]=useState("")
  const router=useRouter()
  const Logout = async ()=>{
    try{
      await axios.get('/api/users/logout')
      toast.success('Logout Sucessfull')
      router.push('/login')
    }catch(e: any){
      console.log(e.message)
      toast.error(e.message)
    }
  }

  const getuserDetails = async()=>{
    const res= await axios.get('/api/users/me')
    if(res.data.success)
      toast.success("Got IT!!!")
    setData(res.data.data._id)
  }
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      <h1 className='text-center'>Profile Page</h1>
      <h2 className='p-4 rounded bg-green-500'>{data===""? "Nothing here": <Link href={`/profile/${data}`}>See User ID</Link>}</h2>
      <button className="bg-green-500 mt-4 px-3 py-2" onClick={getuserDetails}>Get User Detail</button>
      <button  onClick={Logout}>Logout</button>

    </div>
  )
}

export default ProfilePage