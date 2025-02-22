"use client"

import { redirect } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import LazyLoadContainer from "@/components/common/lazyload-container"
import AdminSideBar from "@/components/layout/admin-side-bar"

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = useAuthStore()
  if (!user || !user.roles.includes("ADMIN")) redirect("/admin")
  return (
    <LazyLoadContainer>
      <SidebarProvider>
        <AdminSideBar></AdminSideBar>
        <div className="flex-1 p-2 bg-main-blue-t9 min-h-screen">
          <div className="border rounded-lg bg-background h-full p-6 relative">
            <div className="absolute">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </LazyLoadContainer>
  )
}

export default AdminLayout
