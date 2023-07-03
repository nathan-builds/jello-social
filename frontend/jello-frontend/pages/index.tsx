'use client';

import { Inter } from 'next/font/google';
import Navbar from '@/components/custom/navbar';
import SocialFeed from '@/pages/feed/social-feed';
import LoginSignup from '@/pages/auth/login-signup';
import { useSession } from 'next-auth/react';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {

    const { data: session, status } = useSession();
    return (
        <div className="flex flex-col items-center">
            <div className="w-full h-50">
                <Navbar></Navbar>
            </div>
            {session ? (
                <div className="flex flex-row gap-5">
                    {/*<div>*/}
                    {/*    <Sidebar></Sidebar>*/}
                    {/*</div>*/}
                    <div className="my-20">
                        <SocialFeed></SocialFeed>
                    </div>
                </div>
            ) : <div className="my-20">
                <LoginSignup/>
            </div>}


        </div>
    );
}
