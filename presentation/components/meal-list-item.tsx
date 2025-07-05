import { View, Text } from "react-native";
import { Meal } from "../../domain/meal";

export function MealListItem({ meal }: { meal: Meal }) {
  return (
    <View
      className="bg-white rounded-2xl shadow-md p-4 mb-4"
      style={{ borderRadius: 18 }}
    >
      <Text className="text-xl font-bold text-green-base mb-2">
        {meal.name}
      </Text>
      <Text className="text-base text-gray-500 mb-2">Horário: {meal.time}</Text>
      <View className="flex-row flex-wrap gap-4">
        <Text className="text-base text-gray-600">
          Kcal: <Text className="font-bold text-black">{meal.kcal}</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Carb: <Text className="font-bold text-black">{meal.carbs}g</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Prot: <Text className="font-bold text-black">{meal.protein}g</Text>
        </Text>
        <Text className="text-base text-gray-600">
          Gord: <Text className="font-bold text-black">{meal.fat}g</Text>
        </Text>
      </View>
    </View>
  );
}
