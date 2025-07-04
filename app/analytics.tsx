import { View, Text, ScrollView, Dimensions } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

const macros = [
  {
    label: "Calorias",
    value: 850,
    goal: 1700,
    unit: "kcal",
    icon: <MaterialCommunityIcons name="fire" size={28} color="#257F49" />,
    color: "bg-green-soft",
    textColor: "text-green-base",
    barColor: "bg-green-base",
  },
  {
    label: "Carboidratos",
    value: 180,
    goal: 300,
    unit: "g",
    icon: (
      <MaterialCommunityIcons name="food-apple" size={28} color="#3B9B62" />
    ),
    color: "bg-green-soft",
    textColor: "text-green-light",
    barColor: "bg-green-light",
  },
  {
    label: "Proteína",
    value: 60,
    goal: 90,
    unit: "g",
    icon: <FontAwesome5 name="drumstick-bite" size={26} color="#257F49" />,
    color: "bg-green-soft",
    textColor: "text-green-base",
    barColor: "bg-green-base",
  },
  {
    label: "Gordura",
    value: 30,
    goal: 60,
    unit: "g",
    icon: <MaterialCommunityIcons name="oil" size={28} color="#3B9B62" />,
    color: "bg-green-soft",
    textColor: "text-green-light",
    barColor: "bg-green-soft",
  },
];

const meals = [
  {
    name: "Café da Manhã",
    icon: <MaterialCommunityIcons name="coffee" size={24} color="#257F49" />,
    calories: 350,
    carbs: 60,
    protein: 15,
    fat: 10,
  },
  {
    name: "Almoço",
    icon: <MaterialCommunityIcons name="food" size={24} color="#3B9B62" />,
    calories: 600,
    carbs: 90,
    protein: 30,
    fat: 20,
  },
  {
    name: "Jantar",
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={24}
        color="#257F49"
      />
    ),
    calories: 400,
    carbs: 30,
    protein: 15,
    fat: 10,
  },
];

const chartData = {
  labels: macros.map((m) => m.label),
  datasets: [
    {
      data: macros.map((m) => Math.round((m.value / m.goal) * 100)),
    },
  ],
};

const chartColors = ["#257F49", "#3B9B62", "#257F49", "#E9F3EF"];

export default function Analytics() {
  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 28 }}
    >
      <Text className="text-2xl font-bold text-green-base mb-6 text-center">
        Resumo Nutricional
      </Text>
      {/* Cards de Macros um embaixo do outro */}
      <View className="gap-6 mb-8">
        {macros.map((macro, idx) => (
          <View
            key={macro.label}
            className={`w-full ${macro.color} rounded-3xl shadow-md flex-row items-center gap-4`}
            style={{ borderRadius: 24, padding: 24 }}
          >
            <View className="mr-4">{macro.icon}</View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500 font-medium mb-2">
                {macro.label}
              </Text>
              <Text className={`text-xl font-bold ${macro.textColor} mb-2`}>
                {macro.value}{" "}
                <Text className="text-base font-normal text-gray-400">
                  / {macro.goal}
                  {macro.unit}
                </Text>
              </Text>
              <View className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <View
                  className={`h-2 rounded-full ${macro.barColor}`}
                  style={{
                    width: `${Math.min(
                      100,
                      (macro.value / macro.goal) * 100
                    )}%`,
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* Gráfico de barras real */}
      <View
        className="bg-white rounded-3xl shadow-md mb-10"
        style={{ borderRadius: 24, padding: 24 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-base font-semibold text-green-base">
            Distribuição dos Macros (%)
          </Text>
          <View className="bg-green-base rounded-full p-2">
            <Text className="text-white text-lg">📊</Text>
          </View>
        </View>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 60}
          height={180}
          yAxisLabel=""
          yAxisSuffix="%"
          fromZero
          showValuesOnTopOfBars
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => chartColors[0],
            labelColor: () => "#45525F",
            barPercentage: 0.6,
            fillShadowGradient: "#257F49",
            fillShadowGradientOpacity: 1,
            propsForBackgroundLines: { stroke: "#E1EBF4" },
          }}
          style={{ borderRadius: 20 }}
        />
      </View>
      {/* Cards de Refeições */}
      <Text className="text-lg font-bold text-green-base mb-4">
        Refeições do Dia
      </Text>
      <View className="gap-6 mb-8">
        {meals.map((meal) => (
          <View
            key={meal.name}
            className="w-full bg-white rounded-3xl shadow-md flex-row items-center gap-4"
            style={{ borderRadius: 24, padding: 24 }}
          >
            <View className="mr-4">{meal.icon}</View>
            <View className="flex-1 gap-2">
              <Text className="text-base font-bold text-green-base mb-2">
                {meal.name}
              </Text>
              <View className="flex-row flex-wrap gap-y-2 gap-x-4 mb-1">
                <Text className="text-xs text-gray-500">
                  Calorias:{" "}
                  <Text className="text-black font-semibold">
                    {meal.calories}
                  </Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  Carb:{" "}
                  <Text className="text-black font-semibold">
                    {meal.carbs}g
                  </Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  Prot:{" "}
                  <Text className="text-black font-semibold">
                    {meal.protein}g
                  </Text>
                </Text>
                <Text className="text-xs text-gray-500">
                  Gord:{" "}
                  <Text className="text-black font-semibold">{meal.fat}g</Text>
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
