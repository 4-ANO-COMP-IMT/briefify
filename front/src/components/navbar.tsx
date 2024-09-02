import { useContext } from "react";
import { buttonVariants } from "./ui/button";
import { Logo } from "./ui/logo";
import { UserContext } from "@/contexts/user-context";

export function Navbar() {
  const { isLogged } = useContext(UserContext);

  const AUTH_BUTTONS_VISIBILITY =
    window.location.pathname === "/sign-in" ||
    window.location.pathname === "/sign-up";

  return (
    <div className="bg-transparent fixed top-0 w-full px-6 py-4 flex flex-row items-center justify-between z-20 backdrop-blur-sm">
      <a href="/" className={buttonVariants({ variant: "link" })}>
        <Logo />
      </a>
      <div
        className={`flex flex-row gap-2 items-center ${AUTH_BUTTONS_VISIBILITY || isLogged ? "hidden" : null}`}
      >
        <a href="/sign-up" className={buttonVariants({ variant: "ghost" })}>
          Cadastrar
        </a>
        <a href="/sign-in" className={buttonVariants({ variant: "default" })}>
          Entrar
        </a>
      </div>
    </div>
  );
}
