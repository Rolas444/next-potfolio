import React from "react";
import './auth.css'

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <>
        <div className="panel">
            <div className="panel-container">
                {children}
            </div>
        </div>
            
        </>
    )
}

export default AuthLayout;