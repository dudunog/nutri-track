import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-green-base",
  secondary: "bg-white border border-green-base text-green-base",
};

const textVariants = {
  primary: "text-white",
  secondary: "text-green-base",
};

export function Button({
  title,
  variant = "primary",
  isLoading = false,
  className,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={`w-full h-14 items-center justify-center rounded-xl ${variants[variant]} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={`text-xl ${textVariants[variant]}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
