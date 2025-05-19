import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId, syncUser } from '@/actions/user.action'
import Link from 'next/link'
import {Waypoints} from 'lucide-react'
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';

// #FFFD54

const Navbar = async() => {
    const user = await currentUser();
    if(user) await syncUser();
    const userName = `${user?.firstName} ${user?.lastName}`
    if(!user) return;
    const dbUser = await getUserByClerkId(user.id)
  return (
    <div className='flex justify-center items-center bg-[var(--bg-color)] h-[70px]'>

    <div className='flex justify-between items-center w-[90%]'>
        <div>
            <Link href={`/`} className='flex justify-center items-center gap-2'>
                <Waypoints color='#fff'/>
                <h1 className='text-[var(--text-color)] text-2xl font-bold'>Cirqle</h1>
            </Link>
        </div>

        <div className='flex gap-5'>
            <div>
                
                <h2 className='text-[var(--text-color)] text-xl font-semibold hover:text-[var(--btn-color)]'>
                    <Link href={`/allusers`}>
                    <PeopleIcon/>
                    </Link>
                    </h2>
            </div>
               <div>
                
                <h2 className='text-[var(--text-color)] text-xl font-semibold hover:text-[var(--btn-color)]'>
                    <Link href={`/notifications`}>
                    <NotificationsIcon/>
                    </Link>
                    </h2>
            </div>
            
        </div>
        
        <div>
        <SignedOut>
            <SignInButton>
                <Button variant="destructive">Sign In</Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
        </div>
    </div>
    </div>
  )
}

export default Navbar