import { getDataFromToken } from "@/helpers/getDataFromtoken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import {connect} from '@/dbConfig/dbConfig';
// import { connect } from "http2";

connect();

export async function GET(request: NextRequest){
    try{
        const userId=await getDataFromToken(request)
        const user= await User.findOne({_id:userId}).select('-password');

        return NextResponse.json({
            message: 'User found',
            data: user,
            success: true
        })
    }catch(e: any){
        return NextResponse.json({error: e.message},{status: 500})
    }
}