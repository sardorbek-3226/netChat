import { Outlet } from "react-router-dom";
import UserInHeader from "../components/userInHeader";

function MainLayout() {
  return (
      <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="hidden md:block">
          <UserInHeader />
        </header>
        <header className="md:hidden bg-white shadow px-4 py-2">
          <h1 className="text-lg font-semibold text-gray-800">NetChat</h1>
        </header>

        <main className="flex-1 px-2 sm:px-4 md:px-6 lg:px-8 py-4">
          <Outlet />
        </main>
      </div>
  );
}

export default MainLayout;
