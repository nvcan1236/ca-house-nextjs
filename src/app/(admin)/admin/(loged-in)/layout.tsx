import LazyLoadContainer from "@/components/common/LazyLoadContainer";
import AdminSideBar from "@/components/layout/admin-side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <LazyLoadContainer>
      <SidebarProvider>
        {/* <div className="flex flex-col md:flex-row bg-main-blue-t9 min-h-screen">
          <AdminSideBar2></AdminSideBar2>
          <div className="flex-1 p-2">
            <div className="border rounded-lg bg-background h-full p-6">
              <SidebarTrigger />
              {children}
            </div>
          </div>
        </div> */}
        <AdminSideBar></AdminSideBar>
        <div className="flex-1 p-2 bg-main-blue-t9 min-h-screen">
          <div className="border rounded-lg bg-background h-full p-6">
            <SidebarTrigger />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </LazyLoadContainer>
  );
};

export default AdminLayout;
