import { Pressable, View, type PressableProps } from "react-native";
import { Check } from "lucide-react-native";
import { cn } from "../../lib/utils";

interface CheckboxProps extends Omit<PressableProps, "onPress"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  className,
  ...props
}: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        "h-6 w-6 items-center justify-center rounded border-2",
        checked
          ? "border-bluenormal bg-bluenormal"
          : "border-bluenormal bg-transparent",
        className
      )}
      {...props}
    >
      {checked && <Check size={16} color="white" />}
    </Pressable>
  );
}
