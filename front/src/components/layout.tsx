import { ReactNode } from "react";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full relative">
      <Navbar />
      {children}
    </div>
  );
}
