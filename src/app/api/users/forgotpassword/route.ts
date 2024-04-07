import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest){
    try{
        const {email} = await request.json();

      console.log(email)
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not Exist"}, {status:404})
        }

        const res=sendEmail({email, emailType: "RESET", userId: user._id})
        console.log(res)
        const response = NextResponse.json({
            message: "Check your Email",
            success: true
        }, {status: 200})
        return response
    }catch(e:any){
        return NextResponse.json({error: e.message}, {status: 500})
    }
}