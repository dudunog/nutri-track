import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelect = (option: string) => {
    console.log("Selecionando: ", option);
  }

  const options = [
    { title: "Perder peso", onPress: () => handleSelect("Perder peso") },
    { title: "Manter peso", onPress: () => handleSelect("Manter peso") },
    {
      title: "Ganhar massa muscular",
      onPress: () => handleSelect("Ganhar massa muscular"),
    },
    { title: "Melhorar a saúde", onPress: () => handleSelect("Melhorar a saúde") },
  ];

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep
        title="Qual o seu objetivo?"
        subtitle="Vamos precisar de algumas informações para ajustar o seu plano."
        options={ options }
        onContinue={() => router.push("/user-objetives")}
       />
    </View>
  );
}
