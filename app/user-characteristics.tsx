import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function UserCharacteristics() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelect = (option: string) => {
    console.log("Selecionando: ", option);
  }

  const options = [
    { title: "Leve", onPress: () => handleSelect("Leve") },
    { title: "Moderado", onPress: () => handleSelect("Moderado") },
    { title: "Intenso", onPress: () => handleSelect("Intenso") },
  ];

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep
        title="Qual a sua altura?"
        options={options}
        onContinue={() => router.push("/user-sex")}
      />
    </View>
  );
}