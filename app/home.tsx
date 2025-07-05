import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/presentation/components/button";
import { ListTipsUseCase } from "../usecases/list-tips.usecase";
import { ListRemindersUseCase } from "../usecases/list-reminders.usecase";
import { ListMealsUseCase } from "../usecases/list-meals.usecase";
import { MealApiRepository } from "../data/meal-api.repository";
import { GetNutritionistUseCase } from "../usecases/get-nutritionist.usecase";
import { NutritionistApiRepository } from "../data/nutritionist-api.repository";
import { useAuth } from "../contexts/auth-context";
import { Tip } from "../domain/tip";
import { Reminder } from "../domain/reminder";
import { Meal } from "../domain/meal";
import { Nutritionist } from "../domain/nutritionist";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [tip, setTip] = useState<Tip | null>(null);
  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [nutritionist, setNutritionist] = useState<Nutritionist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      setLoading(true);
      try {
        const tips = await new ListTipsUseCase().execute();
        setTip(tips[0]);
        const reminders = await new ListRemindersUseCase().execute();
        setReminder(reminders[0]);
        const mealsData = await new ListMealsUseCase(
          new MealApiRepository()
        ).execute();
        setMeals(mealsData);

        const getNutritionistUseCase = new GetNutritionistUseCase(
          new NutritionistApiRepository()
        );
        const nutritionistData = await getNutritionistUseCase.executeByUserId(
          user.id
        );
        setNutritionist(nutritionistData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const lastMeal = meals.length > 0 ? meals[meals.length - 1] : null;
  const nextMeal = meals.find(
    (meal) => meal.time > (lastMeal?.time || "00:00")
  );

  if (!user) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#257F49" />
        <Text className="text-green-base text-lg mt-4">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-end bg-gray-100">
      <View className="flex-1 px-6 pt-10">
        {tip && (
          <View className="flex-row items-center mb-4 justify-center gap-2">
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={22}
              color="#257F49"
              style={{ marginRight: 6 }}
            />
            <Text className="text-green-base text-base font-semibold text-center">
              {tip.text}
            </Text>
          </View>
        )}
        {reminder && (
          <View
            className="bg-green-soft rounded-2xl p-4 mb-6"
            style={{ borderRadius: 18 }}
          >
            <Text className="text-green-base text-base text-left font-medium">
              Lembrete: {reminder.text}
            </Text>
          </View>
        )}
        {lastMeal && (
          <View
            className="bg-white rounded-3xl shadow-md p-6 mb-6"
            style={{ borderRadius: 24 }}
          >
            <Text className="text-lg font-bold text-green-base mb-2">
              Última refeição:{" "}
              <Text className="text-base font-thin text-gray-600 mb-2">
                {lastMeal.name.toLocaleLowerCase()} às {lastMeal.time}
              </Text>
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
                <Text className="text-black font-bold">
                  {lastMeal.protein}g
                </Text>
              </Text>
              <Text className="text-base text-gray-500">
                Gord:{" "}
                <Text className="text-black font-bold">{lastMeal.fat}g</Text>
              </Text>
            </View>
          </View>
        )}
        {nextMeal && (
          <View
            className="bg-green-soft rounded-2xl p-4 mb-6"
            style={{ borderRadius: 18 }}
          >
            <Text className="text-green-base font-bold text-lg text-center">
              Próxima refeição: {nextMeal.name} às {nextMeal.time}
            </Text>
          </View>
        )}
        <Button
          variant="primary"
          title="Ver histórico de refeições"
          onPress={() => router.push("/meal-history")}
          className="text-lg font-bold text-green-base mb-4"
        />
        <Button
          variant="secondary"
          title="Ver alimentos"
          onPress={() => router.push("/food-list")}
          className="text-lg font-bold text-green-base mb-6"
        />
        {nutritionist && (
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
              <Text className="text-base text-gray-700">
                {nutritionist.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View className="flex-row justify-between mt-8 mb-2 gap-4">
          <Button
            variant="secondary"
            title="Registrar refeição"
            onPress={() => router.push("/meal-register")}
            className="flex-1"
          />
          <Button
            variant="secondary"
            title="Registrar água"
            onPress={() => router.push("/water-register")}
            className="flex-1"
          />
        </View>
      </View>
      <View className="w-full bg-green-soft flex-row justify-around items-center h-20 border-t border-green-light">
        <TouchableOpacity className="items-center flex-1" activeOpacity={1}>
          <Text className="text-2xl" style={{ color: "#257F49" }}>
            ▦
          </Text>
          <Text className="text-green-base font-bold text-sm mt-1">Painel</Text>
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
          <Text className="text-black text-sm mt-1">Resumo</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7}>
          <Text className="text-2xl">👤</Text>
          <Text className="text-black text-sm mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
