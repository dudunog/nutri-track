import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/presentation/components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthGuard } from "../hooks/useAuthGuard";

export default function NutritionistHome() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthGuard();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 justify-end bg-gray-100">
      <ScrollView
        className="flex-1 px-6 pt-10"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-green-base mb-2">
            Painel do Nutricionista
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Gerencie seus pacientes e acompanhe seus progressos
          </Text>
        </View>

        <View
          className="mt-4 bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-4">
            Estatísticas
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-base">12</Text>
              <Text className="text-sm text-gray-600">Pacientes</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-base">8</Text>
              <Text className="text-sm text-gray-600">Ativos</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-base">4</Text>
              <Text className="text-sm text-gray-600">Novos</Text>
            </View>
          </View>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-4">
            Ações Rápidas
          </Text>

          <TouchableOpacity
            className="flex-row items-center mb-4 p-4 bg-green-soft rounded-xl gap-2"
            onPress={() => router.push("/patient-list")}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color="#257F49"
            />
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-green-base">
                Ver Pacientes
              </Text>
              <Text className="text-sm text-gray-600">
                Lista completa de pacientes
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#257F49"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center mb-4 p-4 bg-green-soft rounded-xl gap-2"
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="plus-circle"
              size={24}
              color="#257F49"
            />
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-green-base">
                Novo Paciente
              </Text>
              <Text className="text-sm text-gray-600">
                Adicionar novo paciente
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#257F49"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 bg-green-soft rounded-xl gap-2"
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color="#257F49"
            />
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-green-base">
                Relatórios
              </Text>
              <Text className="text-sm text-gray-600">
                Análises e relatórios
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#257F49"
            />
          </TouchableOpacity>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-4">
            Pacientes Recentes
          </Text>

          <View className="flex-row items-center mb-3 p-3 bg-gray-50 rounded-xl">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/32.jpg",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 12,
              }}
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800">
                Maria Santos
              </Text>
              <Text className="text-sm text-gray-600">
                Última consulta: 2 dias atrás
              </Text>
            </View>
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-xs text-green-700 font-medium">Ativo</Text>
            </View>
          </View>

          <View className="flex-row items-center p-3 bg-gray-50 rounded-xl">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 12,
              }}
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800">
                João Silva
              </Text>
              <Text className="text-sm text-gray-600">
                Última consulta: 1 semana atrás
              </Text>
            </View>
            <View className="bg-yellow-100 px-2 py-1 rounded-full">
              <Text className="text-xs text-yellow-700 font-medium">
                Pendente
              </Text>
            </View>
          </View>
        </View>

        <View
          className="bg-green-soft rounded-2xl p-4"
          style={{ borderRadius: 18 }}
        >
          <Text className="text-green-base text-base text-center font-medium">
            💡 Mantenha-se atualizado com o progresso dos seus pacientes para
            oferecer o melhor acompanhamento!
          </Text>
        </View>
      </ScrollView>

      <View className="w-full bg-green-soft flex-row justify-around items-center h-20 border-t border-green-light">
        <TouchableOpacity className="items-center flex-1" activeOpacity={1}>
          <Text className="text-2xl" style={{ color: "#257F49" }}>
            ▦
          </Text>
          <Text className="text-green-base font-bold text-sm mt-1">Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center flex-1"
          activeOpacity={0.7}
          onPress={() => router.push("/patient-list")}
        >
          <Text className="text-2xl">👥</Text>
          <Text className="text-black text-sm mt-1">Pacientes</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1" activeOpacity={0.7}>
          <Text className="text-2xl">📊</Text>
          <Text className="text-black text-sm mt-1">Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center flex-1"
          activeOpacity={0.7}
          onPress={() => router.push("/nutritionist-profile")}
        >
          <Text className="text-2xl">👤</Text>
          <Text className="text-black text-sm mt-1">Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
