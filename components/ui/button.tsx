import { Text, Pressable, type PressableProps } from "react-native";
import { cn } from "../../lib/utils";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export function Button({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "items-center justify-center rounded-full px-6 py-3.5",
        variant === "default" && "bg-bluenormal active:opacity-80",
        variant === "outline" && "border border-bluenormal",
        variant === "ghost" && "bg-transparent",
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-base font-bold",
          variant === "default" && "text-white",
          variant === "outline" && "text-bluenormal",
          variant === "ghost" && "text-bluenormal"
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
