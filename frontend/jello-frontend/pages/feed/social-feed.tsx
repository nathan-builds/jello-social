'use client';

import Post from '@/components/custom/post';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const SocialFeed = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {

        if (!session) {
            console.log('User not authorized!!!');
            router.push({
                pathname: '/'
            });
        }
    }, []);


    return (
        <div className="flex flex-col gap-2">
            <Post
                text={'Just had the most amazing dinner with friends! Delicious food, great company, ' +
                    'and lots of laughter. ' + 'Feeling blessed and grateful for these moments. #GoodTimes'}></Post>
            <Post
                text={'🎉 Exciting news! I\'ve been accepted into my dream university! Can\'t wait to start this ' +
                    'new chapter of my life. Thanks to everyone who supported me along the way. #DreamsComeTrue'}></Post>
            <Post
                text={'Feeling inspired after attending an incredible TEDx event today. ' +
                    'The speakers shared thought-provoking ideas and challenged us to think differently. ' +
                    'So grateful for such enriching experiences! #TEDx'}></Post>
            <Post
                text={'Feeling inspired after attending an incredible TEDx event today. ' +
                    'The speakers shared thought-provoking ideas and challenged us to think differently. ' +
                    'So grateful for such enriching experiences! #TEDx'}></Post>
            <Post
                text={'Just had the most amazing dinner with friends! Delicious food, great company, ' +
                    'and lots of laughter. ' + 'Feeling blessed and grateful for these moments. #GoodTimes'}></Post>
            <Post
                text={'Just had the most amazing dinner with friends! Delicious food, great company, ' +
                    'and lots of laughter. ' + 'Feeling blessed and grateful for these moments. #GoodTimes'}></Post>
            <Post
                text={'Wow had a great time at the party guys, looking forward to seeing all of you again!'}></Post>
        </div>);
};


export default SocialFeed;
