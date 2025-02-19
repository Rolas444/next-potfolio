import { getServerSession } from 'next-auth';
// import { SessionProvider } from "next-auth/react";
import { authOptions } from '../api/auth/[...nextauth]/route';
// import type { AppProps } from "next/app";
import React from "react";

const DashLayout = async ({ children }:{children: React.ReactNode}) => {

    const session = await getServerSession(authOptions);

    if(!session)
    return (<>
        <div>
            <p>You are not signed in</p>
        </div>
    </>)

    return (<>
        
            {children}
       
    </>)
}

export default DashLayout;
