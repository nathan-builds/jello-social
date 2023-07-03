'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs';
import { useReducer, useState } from 'react';
import {
    initialLoginState,
    loginFormReducer, LoginFormState,
    LoginSignupActions
} from '@/components/custom/login-signup/login-signup-reducer';
import { signIn } from 'next-auth/react';

function LoginSignup() {

    const [state, dispatch] = useReducer(loginFormReducer, initialLoginState);
    const onLogin = async (): Promise<void> => {
        console.log(state.currentUsername, state.currentPassword);

        const result = await signIn('credentials', {
            username: state.currentUsername,
            password: state.currentPassword,
            redirect: false,
            callbackUrl: '/feed/social-feed'

        });
    };
    const onCreate = (): void => {
    };


    return (
        <div>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="create_account">Create Account</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Welcome back!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" value={state.currentUsername} onChange={(e) => dispatch({
                                    type: LoginSignupActions.CURRENT_USERNAME,
                                    payload: e.target.value
                                })}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="p_word">Password</Label>
                                <Input type="password" id="p_word" value={state.currentPassword}
                                       onChange={(e) => dispatch({
                                           type: LoginSignupActions.CURRENT_PASSWORD,
                                           payload: e.target.value
                                       })}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-1/4" onClick={onLogin}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="create_account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Account</CardTitle>
                            <CardDescription>
                                Create a new account on jello.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirm">Confirm Password</Label>
                                <Input id="confirm" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-1/4">Create</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default LoginSignup;