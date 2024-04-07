import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest){
    try{
        const {tp, token} = await request.json();
      console.log(token, tp)
      const salt= await bcryptjs.genSalt(10)
      const hashedPasswword = await bcryptjs.hash(tp, salt)
        const user = await User.findOneAndUpdate({forgotPasswordToken:token}, {password:hashedPasswword, forgotPasswordToken:"", forgotPasswordTokenExpiry:""})
        if(!user){
            return NextResponse.json({error: "User does not Exist"}, {status:404})
        }
        console.log(user)
        const response = NextResponse.json({
            message: "Check your Email",
            success: true
        }, {status: 200})
        return response
    }catch(e:any){
            console.log(e.message)
        return NextResponse.json({error: e.message}, {status: 500})
    }
}