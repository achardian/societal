import Header from "@/components/header";
import ProfileCard from "@/components/profile-card";
import Sidebar from "@/components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <main className="flex-[2]">
        <Header />
        {children}
      </main>
      <div className="flex-1 border-x hidden lg:block p-3 sticky top-0 h-screen">
        <ProfileCard />
      </div>
    </div>
  );
};

export default MainLayout;
