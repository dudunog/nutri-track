import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function UserSex() {
  const navigation = useNavigation();
  const [selectedSex, setSelectedSex] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedSex(option);
  };

  const options = [
    { title: "Masculino", value: "man", onPress: () => handleSelect("man") },
    { title: "Feminino", value: "woman", onPress: () => handleSelect("woman") },
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep
        title="Qual seu sexo?"
        options={options}
        selectedItem={selectedSex}
        onContinue={() => router.push("/user-characteristics")}
      />
    </View>
  );
}
