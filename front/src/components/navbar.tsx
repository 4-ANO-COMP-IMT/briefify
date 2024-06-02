import { NotepadText } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <div className="bg-transparent fixed top-0 w-full px-6 py-4 flex flex-row items-center justify-between z-20 backdrop-blur-sm">
      <div className="flex flex-row gap-2 items-center">
        <NotepadText strokeWidth={1.5} className="h-5 w-5" />
        <p className="text-primary font-semibold">Briefify</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Button variant={"ghost"}>Cadastrar</Button>
        <Button>Entrar</Button>
      </div>
    </div>
  );
}
