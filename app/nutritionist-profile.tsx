import { View, Text, Image, ScrollView } from "react-native";

const nutritionist = {
  name: "Dr. João Nutri",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

export default function NutritionistProfile() {
  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 48 }}
    >
      <View className="items-center mb-12">
        <Image
          source={{ uri: nutritionist.avatar }}
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
          {nutritionist.name}
        </Text>
      </View>
    </ScrollView>
  );
}
