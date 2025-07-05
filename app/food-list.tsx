import { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { ListFoodsUseCase } from "../usecases/list-foods.usecase";
import { Food } from "../domain/food";
import { FoodListItem } from "../presentation/components/food-list-item";

export default function FoodList() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await new ListFoodsUseCase().execute();
        setFoods(data);
      } catch (e: any) {
        setError(e.message || "Erro ao buscar alimentos");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 28 }}
    >
      <Text className="text-3xl font-bold text-green-base mb-8 text-center">
        Lista de Alimentos
      </Text>
      {loading && (
        <ActivityIndicator size="large" color="#257F49" className="mt-10" />
      )}
      {error && (
        <Text className="text-red-600 text-center mt-4 text-lg">{error}</Text>
      )}
      <View className="mt-5">
        {foods.map((food) => (
          <FoodListItem key={food.id} food={food} />
        ))}
      </View>
    </ScrollView>
  );
}
