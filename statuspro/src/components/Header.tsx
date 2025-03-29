"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

const Header = () => {
    const {data : session} = useSession();

    const handleSignout = async ()=>{
        await signOut();
    }
  return (
    <div>
        <button onClick={handleSignout}>Signout</button>

{session ? (
    <div>
        {/* <Link href="/profile">
            Profile
        </Link>
        <Link href="/dashboard">
            Dashboard
        </Link> */}
        <div className="p-2">Welcome</div>
    </div>
) : (
    <div>
        <Link href="/login">
            Login
        </Link>
        <Link href="/register">
            Register
        </Link>
    </div>
)
    </div>
  )
}

export default Header