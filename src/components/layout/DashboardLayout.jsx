/* eslint-disable react/prop-types */

import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  flex justify-center items-center gap-2 bg-gray-100">
      <Sidebar />
      <div className=" w-full   lg:ml-80 pl-7   ">{children}</div>
    </div>
  );
}