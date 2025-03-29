"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const page = () => {
    const [userdata,setUserdata]= useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, seterror] = useState<string | null>(null)
    const router = useRouter()


    const handleSubmit = async(e: React.FormEvent <HTMLFormElement>)=>{
        e.preventDefault();
        const {confirmPassword,email,name , password}= userdata;
        if(password !== confirmPassword){
    seterror("Passwords do not match");
        }

        try {
          const res =   await fetch("/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({name,email,password})
            })

            const data =  res.json();

            if(!res.ok){
                seterror("Registration failed");
            }

            router.push("/login")


        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <h1>Registration</h1>
    </div>
  )
}

export default page