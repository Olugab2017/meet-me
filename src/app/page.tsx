"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BetterAuthError } from "better-auth";
import { ErrorContext } from "better-auth/react";


export default function Home() {
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession(); 
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword
    }, {
      onError: (context: ErrorContext) => {
        window.alert(context.error.message ?? "Unknown error");
      },
      onSuccess: (data) => {
        window.alert("Registration successful! Please check your email to verify your account.");
      }
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      email : loginEmail,
      password: loginPassword
    }, {
      onError: (context: ErrorContext) => {
        window.alert(context.error.message ?? "Unknown error");
      },
      onSuccess: (data) => {
        window.alert("Login successful!");
      }
    })
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <h1>Welcome, {session.user?.name || "User"}!</h1>
        <Button onClick={() => {
          authClient.signOut({}, {
            onSuccess: () => {
              refetch();
            }
          })
        }}>Sign Out</Button>
      </div>
    )
  } 

  return (
    <div>
      <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} />
      <Input placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
      <Button onClick={onSubmit}>Register</Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <Button onClick={onLogin}>Login</Button>
      </div>

    </div>
    
    
    )
}
