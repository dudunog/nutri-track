import { Text, View } from "react-native";
import { Button } from "./button";

type Option = {
  title: string;
  onPress: () => void;
};

type FirstStepProps = {
  title: string;
  subtitle?: string;
  options: Option[];
  onContinue: () => void;
};

export function FirstStep({
  title,
  subtitle,
  options,
  onContinue
}: FirstStepProps) {
  return (
    <View className="mt-20 justify-center">
      <Text className="mt-10 text-3xl font-semibold text-green-base">
        { title }
      </Text>

      <Text className="mt-4 text-xl text-gray-base">
        { subtitle }
      </Text>

      <View className="mt-5 flex-col gap-4 w-full">
        { options.map((option, index) => (
          <Button
            key= { index }
            title= { option.title }
            variant="secondary"
            onPress={ option.onPress }
          />
        ))
        }

        <Button
          title="Continuar"
          variant="primary"
          className="mt-10"
          onPress={ onContinue }
        />
      </View>
    </View>
  );
}
