import { TextInput, type TextInputProps } from "react-native";
import { cn } from "../../lib/utils";

interface InputProps extends TextInputProps {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "h-14 rounded-3xl border border-[#E7E7E7] bg-white px-4 text-base text-black placeholder:text-[#b5b5b5]",
        className
      )}
      placeholderTextColor="#b5b5b5"
      style={{
        lineHeight: 16,
        textAlignVertical: 'center',
        includeFontPadding: false,
      }}
      {...props}
    />
  );
}