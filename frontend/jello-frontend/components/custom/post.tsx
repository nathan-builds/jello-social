import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

interface PostProps {
    text: string;
}

const Post: React.FC<PostProps> = (props) => {
    return (
        <Card>
            <CardContent className="px-2">
                <div className="flex flex-row  gap-2 max-w-lg">
                    <div className="flex flex-col">
                        <div className="h-1"></div>
                        <Avatar>
                            <AvatarImage src="avatar.png"></AvatarImage>
                        </Avatar>
                    </div>

                    <div className="flex flex-col">
                        <span className="py-2 font-bold"> @nhans14 1h</span>
                        <p>
                            {props.text}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Post;