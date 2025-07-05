import { View, Text, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthGuard } from "../hooks/useAuthGuard";

const user = {
  name: "Eduarda Silva",
  age: 28,
  weight: 65,
  height: 168,
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  foodPreferences: ["Frango grelhado", "Salada", "Arroz integral", "Iogurte"],
  foodHates: ["Berinjela", "Camarão", "Pimentão"],
};

export default function Profile() {
  const { isAuthenticated } = useAuthGuard();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 28 }}
    >
      <View className="items-center mb-12">
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 20,
            borderWidth: 4,
            borderColor: "#257F49",
          }}
        />
        <Text className="text-3xl font-bold text-green-base mb-3">
          {user.name}
        </Text>
        <Text className="mt-5 text-2xl text-gray-500">{user.age} anos</Text>
      </View>
      <View
        className="mt-5 bg-white rounded-3xl shadow-md p-10 mb-10 flex-col items-center gap-6"
        style={{ borderRadius: 24, padding: 24 }}
      >
        <View className="flex-row items-center mb-6">
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={38}
            color="#257F49"
          />
          <Text className="text-2xl text-gray-500 ml-3">
            Peso:{" "}
            <Text className="text-3xl text-black font-bold">
              {user.weight}kg
            </Text>
          </Text>
        </View>
        <View className="mt-5 flex-row items-center">
          <MaterialCommunityIcons
            name="human-male-height"
            size={38}
            color="#3B9B62"
          />
          <Text className="text-2xl text-gray-500 ml-3">
            Altura:{" "}
            <Text className="text-3xl text-black font-bold">
              {user.height}cm
            </Text>
          </Text>
        </View>
      </View>
      <View
        className="mt-5 bg-white rounded-3xl shadow-md mb-10"
        style={{ borderRadius: 24, padding: 24 }}
      >
        <Text className="text-2xl font-bold text-green-base mb-6">
          Preferências de comida
        </Text>
        <View className="mt-1 flex-row flex-wrap gap-4 gap-y-4">
          {user.foodPreferences.map((food) => (
            <View key={food} className="bg-green-soft rounded-xl p-4">
              <Text className="text-green-base text-xl font-medium">
                {food}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        className="mt-5 bg-white rounded-3xl shadow-md mb-10"
        style={{ borderRadius: 24, padding: 24 }}
      >
        <Text className="text-2xl font-bold text-green-base mb-6">
          Comidas que não gosto
        </Text>
        <View className="mt-1 flex-row flex-wrap gap-4 gap-y-4">
          {user.foodHates.map((food) => (
            <View key={food} className="bg-red-light rounded-xl p-4">
              <Text className="text-red-600 text-xl font-medium">{food}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
