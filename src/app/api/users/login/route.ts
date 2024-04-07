import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password}=reqBody;
        console.log(reqBody)

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not Exist"}, {status:404})
        }


        const validPassword =await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status:404})
        }

        //create token data
        const tokendata={id: user._id, username: user.username, email: user.email}
        
        //create token
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true
        }, {status: 200})
        response.cookies.set("token", token , {
            httpOnly: true,
        })
        return response
    }catch(e){
        return NextResponse.json({error: e.message}, {status: 500})
    }
}