'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const BtnLogout = () => {

    const router = useRouter();
    const handleSignOut = async () => {
        await signOut({redirect: false});
        router.push('/auth/login')
    }

return (<>
    <button onClick={handleSignOut}>Sign out</button>
</>)

}

export default BtnLogout;