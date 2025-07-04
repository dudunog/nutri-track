import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function UserActivityLevel() {
  const navigation = useNavigation();
  const [selectedActivityLevel, setSelectedActivityLevel] = useState<
    string | null
  >(null);

  const handleSelect = (option: string) => {
    setSelectedActivityLevel(option);
  };

  const options = [
    { title: "Leve", value: "light", onPress: () => handleSelect("light") },
    {
      title: "Moderado",
      value: "moderate",
      onPress: () => handleSelect("moderate"),
    },
    {
      title: "Intenso",
      value: "intense",
      onPress: () => handleSelect("intense"),
    },
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep
        title="Qual o seu nível de atividade física diariamente?"
        options={options}
        selectedItem={selectedActivityLevel}
        onContinue={() => router.push("/user-sex")}
      />
    </View>
  );
}
