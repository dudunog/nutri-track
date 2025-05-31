import { Image, Text, View } from "react-native";
import { Button } from "@/presentation/components/button";
import { router } from "expo-router";

export function Welcome() {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-24 h-24 mb-4"
      />

      <Text className="mt-3 text-3xl font-bold text-green-base">
        NutriTrack
      </Text>

      <View className="mt-14 flex-col gap-4 w-full">
        <Button
          title="Começar"
          variant="primary"
          onPress={() => router.push("/user-objetives")}
        />
        <Button
          title="Já tenho uma conta"
          variant="secondary"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
