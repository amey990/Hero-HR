import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />

        {/* Scrollable Page Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
