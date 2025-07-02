import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function UserSex() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelect = (option: string) => {
    console.log("Selecionando: ", option);
  }

  const options = [
    { title: "Masculino", onPress: () => handleSelect("man") },
    { title: "Feminino", onPress: () => handleSelect("woman") },
  ];

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep
        title="Qual seu sexo?"
        options={options}
        onContinue={() => router.push("/user-characteristics")}
      />
    </View>
  );
}