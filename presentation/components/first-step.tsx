import { Text, View } from "react-native";
import { Button } from "./button";

type Option = {
  title: string;
  onPress: () => void;
  value: string;
};

type FirstStepProps = {
  title: string;
  subtitle?: string;
  selectedItem?: string | null;
  options: Option[];
  onContinue: () => void;
};

export function FirstStep({
  title,
  subtitle,
  selectedItem,
  options,
  onContinue,
}: FirstStepProps) {
  return (
    <View className="mt-20 justify-center">
      <Text className="mt-10 text-3xl font-semibold text-green-base">
        {title}
      </Text>

      <Text className="mt-4 text-xl text-gray-base">{subtitle}</Text>

      <View className="mt-5 flex-col gap-4 w-full">
        {options.map((option, index) => (
          <Button
            key={index}
            title={option.title}
            variant={selectedItem === option.value ? "primary" : "secondary"}
            onPress={option.onPress}
          />
        ))}

        <Button
          title="Continuar"
          variant="primary"
          className="mt-10"
          onPress={onContinue}
        />
      </View>
    </View>
  );
}
