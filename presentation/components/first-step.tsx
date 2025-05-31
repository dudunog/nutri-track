import { Image, Text, View } from "react-native";
import { Button } from "./button";

export function FirstStep() {
  return (
    <View className="mt-20 justify-center">
      <Text className="mt-10 text-3xl font-semibold text-green-base">
        Qual o seu objetivo?
      </Text>

      <Text className="mt-4 text-xl text-gray-base">
        Vamos precisar de algumas informações para ajustar o seu plano.
      </Text>

      <View className="mt-5 flex-col gap-4 w-full">
        <Image source={require("@/assets/images/weight-loss.svg")} />
        <Button title="Perder peso" variant="secondary" onPress={() => {}} />
        <Button title="Manter peso" variant="secondary" onPress={() => {}} />
        <Button
          title="Ganhar massa muscular"
          variant="secondary"
          onPress={() => {}}
        />
        <Button
          title="Melhorar a saúde"
          variant="secondary"
          onPress={() => {}}
        />

        <Button
          title="Continuar"
          variant="primary"
          className="mt-10"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
