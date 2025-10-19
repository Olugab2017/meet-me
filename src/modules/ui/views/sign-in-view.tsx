"use client"
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'lucide-react';
import {useRouter} from 'next/navigation';
import {FaGoogle, FaGithub} from 'react-icons/fa'

import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';


const formSchema = z.object({
  email: z.string().min(1, 'Please enter your name'),
  password: z.string().min(1, 'Password is required'),
});



export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signIn.email(
        {email: data.email, password: data.password, callbackURL: "/"},
        {
            onSuccess: () => {
                setPending(false);
                router.push('/');
                
            },
            onError: ({error}) => {
                setPending(false);
                let errorMessage = error.message;
                if (error.message.includes('User not found')) {
                    errorMessage = 'No account found with this email address.';
                } else if (error.message.includes('Invalid password')) {
                    errorMessage = 'Incorrect password. Please try again.';
                } else if (error.message.includes('not verified')) {
                    errorMessage = 'Please verify your email before signing in.';
                }
                setError(errorMessage);
                
            },
        }
    )
    
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className ='p-6 md: p-8'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center text-center'>
                        <h1 className='text-2xl font-bold'>
                            Welcome back
                        </h1>
                        <p className='text-muted-foreground text-balance'>
                            Please sign in.
                        </p>
                    </div>
                    <div>
                        {/* Form Fields */}
                        <FormField
                            name='email'
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='email' placeholder='you@example.com' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        {/* Form Fields */}
                        <FormField
                            name='password'
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='password' placeholder='••••••••' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {!!error && (/* Example error alert */
                        <Alert className='bg-destructive/10 border-none flex flex-col items-center gap-2 px-3 py-2'>
                            <OctagonAlertIcon className='h-4 w-4 !text-destructive'/>
                            <AlertTitle>{error}</AlertTitle>

                        </Alert>

                    )}
                    <Button disabled={pending} type='submit' className='w-full'>Sign In</Button>
                    <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                        <span className='bg-card text-muted-foreground relative z-10 px-2'>Or continue with </span>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <Button 
                            disabled={pending}
                            onClick={ () =>{
                                authClient.signIn.social({
                                    provider: "google",
                                    callbackURL: "/"
                                })
                            }} 
                            variant='outline' 
                            type='button' className='w-full'>
                            
                            <FaGoogle />
                            Google
                        </Button>
                        <Button 
                            disabled={pending}
                            onClick={ () =>{
                                authClient.signIn.social({
                                    provider: "github",
                                })
                            }}
                            variant='outline' 
                            type='button' 
                            className='w-full'
                        >
                        <FaGithub />
                        GitHub
                        </Button>
                    </div>
                    <div className='text-center text-sm'>
                        <p className='text-muted-foreground'>
                            Don't have an account? <a href="/sign-up" className='underline hover:text-primary'>Sign Up</a>
                        </p>
                    </div>
                </div>
            </form>
          </Form>
          <div className='bg-radial from-blue-700 to-blue-900 relative  md: flex flex-col gap-y-4 items-center justify-center'>
            <img src="/logo.svg" alt="MeetMe Logo" className='h-[92px] w-[92px]'/>
            <p className='text-2xl font-semibold text-white'>MeetMe</p>
          </div>

        </CardContent>
        
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you aggree to our <a href="/terms">Terms of Service</a> and acknowledge that you have read our <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  );
};


