import { FirstStep } from "@/presentation/components/first-step";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <FirstStep />
    </View>
  );
}
