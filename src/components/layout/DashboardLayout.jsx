/* eslint-disable react/prop-types */

import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}