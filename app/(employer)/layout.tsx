import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
// import { LayoutDashboard, FileText, StarsIcon, CreditCard } from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", icon: "/icons/dashboard.svg", path: "/dashboard" },
  { name: "Requests", icon: "/icons/charm_git-request.svg", path: "/requests" },
  { name: "Shortlists", icon: "/icons/shortlist_icon.svg", path: "/shortlists" },
  { name: "Billing", icon: "/icons/billing_icon.svg", path: "/billing" },
];

export default function EmployerLayout({
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
          firstname="John"
          lastname="Doe"
          usermode="Employer"
          avatar="/avatar.png"
        />
        <main className="ml-64 mt-24 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
