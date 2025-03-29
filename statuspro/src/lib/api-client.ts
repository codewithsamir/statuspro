import { IVideo } from "@/models/Video";

export type videoFormData=Omit<IVideo , "_id">

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: any;
}

class ApiClient {
    private async fetch<T>(
        endpoint:string,
        options:FetchOptions = {}

    ):Promise<T>{

        const {method = "GET", body,
            headers = {} } = options;
        const defaultHeaders = {
            "Content-Type":"application/json",
            ...headers
        }

      const response =  await fetch(`/api${endpoint}`,{
            method,
            headers:defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        })

        if(!response.ok){
            throw new Error( await response.text());
        }
        const data = await response.json();

        return data;
    }


   async getVideos(){
    return this.fetch<IVideo[]>(`/videos`)
   }

   async getAVideos(id:string){
    return this.fetch<IVideo>(`/videos/${id}`)
   }

   async createVideo(data:videoFormData){
    return this.fetch<IVideo>(`/videos`,{
        method:"POST",
        body:data,
    })
   }
}


export const apiClient = new ApiClient();