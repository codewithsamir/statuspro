"use client"

import { apiClient } from "@/lib/api-client"
import { IVideo } from "@/models/Video"
import { useEffect, useState } from "react"

const page = () => {
  const [videosdata,setvideodata] = useState<IVideo[]>([])

  // Fetch videos data from your API
  useEffect(()=>{
  const fetchVideos = async()=>{
    try {
    const data = await  apiClient.getVideos()
    setvideodata(data)
    } catch (error) {
      console.log("error fetching videos",error)
    }
  }
  fetchVideos()
  },[])
  return (
    <div>
      <h1>saan reels</h1>
    </div>
  )
}

export default page