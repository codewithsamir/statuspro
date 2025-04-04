import authOptions from "@/lib/authoptions";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";




export async function GET(request: Request) {
    try {
        await connectToDatabase();
       const videos =  await Video.find({}).sort({createdAt: -1}).lean()
       if(!videos || videos.length === 0){
        return  NextResponse.json([],{status:200});
       }
       return  NextResponse.json(videos,{status:200});

    } catch (error) {
        return NextResponse.json({error:"Failed to fetch videos"},{status:500});
    }
}


export async function POST(request: NextResponse) {

    try {
         const session = await getServerSession(authOptions)
            if(!session){
                return NextResponse.json({error:"Unauthorized"},{status:401});
            }

            await connectToDatabase()

            const body:IVideo = await request.json();

            if(!body.title ||
                !body.description ||
                !body.thumbnailUrl ||
                !body.videoUrl){
                return NextResponse.json({error:"Missing required fields"},{status:400});
            }

            const videoData = {
                ...body,
                controls:body.controls ?? true,
                transformation:  {height: 1920, width: 1080, quality: body.transformation?.quality ?? 100},
                
            }

            const newvideo = await Video.create(videoData)

            return NextResponse.json(newvideo,{status:201});
    } catch (error) {
        return NextResponse.json({error:"Failed to create video"},{status:500});
    }
}