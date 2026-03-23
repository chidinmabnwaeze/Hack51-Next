import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const sidebarItems = [
  { name: "Dashboard", icon: "/icons/dashboard.svg", path: "/admin/dashboard" },
  { name: "Submissions", icon: "/icons/submissions.svg", path: "/admin/submissions" },
  {
    name: "Review",
    icon: "/icons/shortlists.svg",
    path: "/admin/review",
  },
  { name: "Catalog", icon: "/icons/catalog.svg", path: "/admin/catalog" },
  { name: "Settings", icon: "/icons/billing.svg", path: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <Sidebar title="" items={sidebarItems} />

      {/* Main area including header and page content */}
      <div className="flex-1">
        <Header
          logo="/logo.png"
          firstname="Admin"
          lastname="User"
          usermode="Admin"
          avatar="/avatar.png"
        />
        <main className="ml-64 mt-24 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
