import { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { ListMealsUseCase } from "../usecases/list-meals.usecase";
import { MealApiRepository } from "../data/meal-api.repository";
import { Meal } from "../domain/meal";
import { MealListItem } from "../presentation/components/meal-list-item";

export default function MealHistory() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      try {
        const mealsData = await new ListMealsUseCase(
          new MealApiRepository()
        ).execute();
        setMeals(mealsData);
      } catch (e: any) {
        setError(e.message || "Erro ao buscar refeições");
      } finally {
        setLoading(false);
      }
    }
    fetchMeals();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 28 }}
    >
      <Text className="text-3xl font-bold text-green-base mb-8 text-center">
        Histórico de Refeições
      </Text>
      {loading && (
        <ActivityIndicator size="large" color="#257F49" className="mt-10" />
      )}
      {error && (
        <Text className="text-red-600 text-center mt-4 text-lg">{error}</Text>
      )}
      <View className="mt-6">
        {meals.map((meal) => (
          <MealListItem key={meal.id} meal={meal} />
        ))}
      </View>
    </ScrollView>
  );
}
