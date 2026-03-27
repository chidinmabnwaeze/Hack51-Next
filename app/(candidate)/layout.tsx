import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: "/icons/dashboard.svg",
    path: "/candidate/dashboard",
  },
  {
    name: "Challenges",
    icon: "/icons/requests.svg",
    path: "/candidate/challenges",
  },
  {
    name: "Submissions",
    icon: "/icons/shortlists.svg",
    path: "/candidate/submissions",
  },
  { name: "Profile", icon: "/icons/billing.svg", path: "/candidate/profile" },
];

export default function CandidateLayout({
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
          firstname="Candidate"
          lastname="User"
          usermode="Candidate"
          avatar="/avatar.png"
        />
        <main className="ml-64 mt-24 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
