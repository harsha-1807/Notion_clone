import React from "react";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }) => {
  return (
    <div className="dark:bg-[#1F1F1F]">
      <Navbar/>
      <main className="h-full pt-28">{children}</main>
    </div>
  );
};

export default MarketingLayout;
