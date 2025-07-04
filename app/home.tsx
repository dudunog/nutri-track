import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-end bg-gray-100">
      {/* Conteúdo principal pode ir aqui, se desejar */}
      <View className="w-full bg-green-soft flex-row justify-around items-center h-20 border-t border-green-light">
        <TouchableOpacity className="items-center flex-1" activeOpacity={1}>
          <Text className="text-2xl" style={{ color: '#257F49' }}>▦</Text>
          <Text className="text-green-base font-bold text-sm mt-1">painel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7}>
          <Text className="text-2xl">🍳</Text>
          <Text className="text-black text-sm mt-1">Diário</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7} onPress={() => router.push("/analytics") }>
          <Text className="text-2xl">📊</Text>
          <Text className="text-black text-sm mt-1">Progresso</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7}>
          <Text className="text-2xl">👤</Text>
          <Text className="text-black text-sm mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
