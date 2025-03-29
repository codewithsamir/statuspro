import { connectToDatabase } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";


export async function POST(request:NextRequest){

    try {
        const {username,email, password} = await request.json();
        if(!username || !password || !email){
            return NextResponse.json({error:"username , email and password required"},{status:400});
        }

        await connectToDatabase();

        const exitingUser =await User.findOne({email});
        if(exitingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        await User.create({
            username,
            email,
            password
        })

        return NextResponse.json({message:"User created successfully"},{status:201});

    } catch (error) {
        return NextResponse.json({error},{status:500});
        
    }
}