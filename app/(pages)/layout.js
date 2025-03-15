"use client"

import ProfileSettingsSidebar from "@/components/layouts/sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* <Sidebar /> */}
      <ProfileSettingsSidebar/>
        <main className="flex-1 overflow-auto p-4">

         {children}

        </main>
    </div>
  );
}