import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const lastMeal = {
  name: "Almoço",
  kcal: 600,
  carbs: 90,
  protein: 30,
  fat: 20,
  time: "12:45",
};

const nutritionist = {
  name: "Dr. João Nutri",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-end bg-gray-100">
      <View className="flex-1 px-6 pt-10">
        {/* Título de boas vindas */}
        <Text className="mt-14 text-2xl font-bold text-green-base mb-6">
          Bem-vindo(a) de volta, Eduarda!
        </Text>
        {/* Última refeição */}
        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-lg font-bold text-green-base mb-2">
            Última refeição
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            {lastMeal.name} às {lastMeal.time}
          </Text>
          <View className="flex-row gap-6 mt-2">
            <Text className="text-base text-gray-500">
              Kcal:{" "}
              <Text className="text-black font-bold">{lastMeal.kcal}</Text>
            </Text>
            <Text className="text-base text-gray-500">
              Carb:{" "}
              <Text className="text-black font-bold">{lastMeal.carbs}g</Text>
            </Text>
            <Text className="text-base text-gray-500">
              Prot:{" "}
              <Text className="text-black font-bold">{lastMeal.protein}g</Text>
            </Text>
            <Text className="text-base text-gray-500">
              Gord:{" "}
              <Text className="text-black font-bold">{lastMeal.fat}g</Text>
            </Text>
          </View>
        </View>
        {/* Card do nutricionista */}
        <TouchableOpacity
          className="bg-white rounded-3xl shadow-md p-6 flex-row items-center gap-4"
          style={{ borderRadius: 24 }}
          onPress={() => router.push("/nutritionist-profile")}
        >
          <Image
            source={{ uri: nutritionist.avatar }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              borderWidth: 2,
              borderColor: "#257F49",
              marginRight: 16,
            }}
          />
          <View>
            <Text className="text-lg font-bold text-green-base">
              Seu nutricionista
            </Text>
            <Text className="text-base text-gray-700">{nutritionist.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Barra inferior */}
      <View className="w-full bg-green-soft flex-row justify-around items-center h-20 border-t border-green-light">
        <TouchableOpacity className="items-center flex-1" activeOpacity={1}>
          <Text className="text-2xl" style={{ color: "#257F49" }}>
            ▦
          </Text>
          <Text className="text-green-base font-bold text-sm mt-1">painel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7}>
          <Text className="text-2xl">🍳</Text>
          <Text className="text-black text-sm mt-1">Diário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center flex-1"
          activeOpacity={0.7}
          onPress={() => router.push("/analytics")}
        >
          <Text className="text-2xl">📊</Text>
          <Text className="text-black text-sm mt-1">Progresso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center flex-1"
          activeOpacity={0.7}
          onPress={() => router.push("/profile")}
        >
          <Text className="text-2xl">👤</Text>
          <Text className="text-black text-sm mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
