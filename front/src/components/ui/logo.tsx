import { AudioWaveform } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <AudioWaveform strokeWidth={1.5} className="h-5 w-5" />
      <p className="text-primary font-semibold">Briefify</p>
    </div>
  );
};
