import { Welcome } from "@/presentation/components/welcome";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
    </View>
  );
}
