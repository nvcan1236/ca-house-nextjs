import LazyLoadContainer from "@/components/common/LazyLoadContainer";
import AdminSidebar from "@/components/layout/admin-sidebar";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <LazyLoadContainer>
      <div className="flex flex-col md:flex-row bg-main-blue-t9 min-h-screen">
        <AdminSidebar></AdminSidebar>
        <div className="flex-1 p-2">
          <div className="border rounded-lg bg-background h-full p-6">
            {children}
          </div>
        </div>
      </div>
    </LazyLoadContainer>
  );
};

export default AdminLayout;
