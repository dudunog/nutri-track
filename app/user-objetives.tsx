import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const navigation = useNavigation();
  const [selectedObjective, setSelectedObjective] = useState<string | null>(
    null
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelect = (option: string) => {
    setSelectedObjective(option);
  };

  const options = [
    {
      title: "Perder peso",
      value: "lose-weight",
      onPress: () => handleSelect("lose-weight"),
    },
    {
      title: "Manter peso",
      value: "maintain-weight",
      onPress: () => handleSelect("maintain-weight"),
    },
    {
      title: "Ganhar massa muscular",
      value: "gain-muscle",
      onPress: () => handleSelect("gain-muscle"),
    },
    {
      title: "Melhorar a saúde",
      value: "improve-health",
      onPress: () => handleSelect("improve-health"),
    },
  ];

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep
        title="Qual o seu objetivo?"
        selectedItem={selectedObjective}
        subtitle="Vamos precisar de algumas informações para ajustar o seu plano."
        options={options}
        onContinue={() => router.push("/user-activity-level")}
      />
    </View>
  );
}
