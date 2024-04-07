import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody= await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message: "User already Exist"}, {status: 400})
        }

        const salt= await bcryptjs.genSalt(10)
        const hashedPasswword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username, 
            email,
            password: hashedPasswword
        })

        const saveduser = await newUser.save()
        console.log(saveduser)

        await sendEmail({email, emailType: "VERIFY", userId: saveduser._id})

        return NextResponse.json({message: "User Created Successfully", success:true,user:saveduser},{status: 200})

    }  catch(e: any){
      console.log(e.message)
        return NextResponse.json({error: e.message},{status: 500})

    }
}