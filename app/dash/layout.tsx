import BtnLogout from "@/components/auth/btnLogout";
import { getServerSession } from "next-auth";
// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";
import React from "react";

const DashLayout = async ({ children }: { children: React.ReactNode }) => {

  return <>
  <div className="container">
    <div className="sidebar">
      <BtnLogout />
    </div>
  </div>
  {children}
  </>;
};

export default DashLayout;


