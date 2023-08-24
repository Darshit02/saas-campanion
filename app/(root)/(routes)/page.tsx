import { UserButton } from "@clerk/nextjs";
import React from "react";

const RootPage = () => {
  return (
  <div>
    {/* User Profile function  */}
    <UserButton afterSignOutUrl="/"/>
  </div>
  )
};

export default RootPage;
