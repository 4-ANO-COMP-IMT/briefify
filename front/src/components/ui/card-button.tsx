import { cn } from "@/lib/utils";
import { LucideIcon, MoveRight } from "lucide-react";
import { useState } from "react";

interface CardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  bottomText: string;
}

export const CardButton = ({
  icon: Icon,
  title,
  description,
  bottomText,
  ...props
}: CardButtonProps) => {
  const [isHovering, setHovering] = useState<boolean>(false);

  return (
    <button
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={cn(
        "p-4 border w-full md:w-96 rounded-md border-muted text-left hover:bg-muted duration-200",
        props.className,
      )}
      {...props}
    >
      <Icon
        className={`${isHovering ? "w-10 h-10" : "w-14 h-14"} transition-all ease-in-out duration-300`}
        strokeWidth={1.5}
      />
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-muted-foreground font-extralight py-2">
        {description}
      </p>
      <div
        className={`flex items-center gap-3 text-xm transition-all ease-in-out duration-300 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} `}
      >
        <p>{bottomText}</p>
        <MoveRight />
      </div>
    </button>
  );
};
