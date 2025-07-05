import { View, Text } from "react-native";
import { Food } from "../../domain/food";

export function FoodListItem({ food }: { food: Food }) {
  return (
    <View
      className="bg-white rounded-2xl shadow-md p-4 mb-4"
      style={{ borderRadius: 18 }}
    >
      <Text className="text-xl font-bold text-green-base mb-2">
        {food.name} -{" "}
        <Text className="text-base text-gray-500 mb-2">{food.category}</Text>
      </Text>
      <View className="flex-row flex-wrap gap-4">
        <Text className="text-base text-gray-600">
          Porção: <Text className="font-bold text-black">{food.portion}</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Kcal: <Text className="font-bold text-black">{food.calories}</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Carb: <Text className="font-bold text-black">{food.carbs}g</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Prot: <Text className="font-bold text-black">{food.protein}g</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Gord: <Text className="font-bold text-black">{food.fat}g</Text>
        </Text>
      </View>
    </View>
  );
}
