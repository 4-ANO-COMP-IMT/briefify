import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { UserProvider } from "@/contexts/user-context";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full relative">
      <UserProvider>
        <Navbar />
        {children}
      </UserProvider>
    </div>
  );
}
