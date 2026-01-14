import { Text, type TextProps } from "react-native";
import { cn } from "../../lib/utils";

interface LabelProps extends TextProps {
  className?: string;
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <Text
      className={cn("text-sm font-medium text-blackblack-500", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
