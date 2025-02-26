'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router= useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const result = await signIn("credentials",{
            redirect: false,
            email,
            password
        })
        console.log(result);
        if (result?.error) {
            // alert(result.error);
            
          } else {
            router.push("/dash");
          }
    }

    return (<>
        <h1>Login</h1>
        <p>Log in to access the full features of the app</p>
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} name="email" />
                </label>
                <label>
                    Password
                    <input type="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    </>)
}

export default LoginPage;