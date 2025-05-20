import { getUserByClerkId } from '@/actions/user.action';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import WhoToFollow from './WhoToFollow';
import SidebarClient from './SidebarClient';
import { redirect } from 'next/navigation';



const Sidebar = async() => {


  const dbUser = await currentUser();
  
  if(!dbUser) return null;
  const user = await getUserByClerkId(dbUser.id);
  
  if(!user) redirect('/');

  return (
    (<div className='sidebar w-[250px] bg-[var(--bg-color)]'>
        <SidebarClient user={user}/>
        <div >
          <WhoToFollow/>
        </div>
    </div>)
  )
}

export default Sidebar