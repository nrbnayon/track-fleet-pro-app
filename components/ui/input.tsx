import { TextInput, type TextInputProps } from "react-native";
import { cn } from "../../lib/utils";

interface InputProps extends TextInputProps {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "h-12 rounded-3xl border border-blackblack-50 bg-white px-4 text-sm text-black",
        className
      )}
      placeholderTextColor="#b5b5b5"
      {...props}
    />
  );
}
