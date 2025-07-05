import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetPatientsUseCase } from "../usecases/get-patients.usecase";
import { UserApiRepository } from "../data/user-api.repository";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { User } from "../domain/user";

export default function PatientList() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthGuard();
  const [patients, setPatients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPatients();
    }
  }, [user]);

  const loadPatients = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const getPatientsUseCase = new GetPatientsUseCase(
        new UserApiRepository()
      );
      const patientsData = await getPatientsUseCase.execute(user.id);
      setPatients(patientsData);
    } catch (error: any) {
      setError(error.message || "Erro ao carregar pacientes");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#257F49" />
        <Text className="text-green-base text-lg mt-4">
          Carregando pacientes...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center px-6">
        <MaterialCommunityIcons name="alert-circle" size={64} color="#257F49" />
        <Text className="text-green-base text-xl font-bold mt-4 text-center">
          {error}
        </Text>
        <TouchableOpacity
          className="mt-6 bg-green-base px-6 py-3 rounded-xl"
          onPress={loadPatients}
        >
          <Text className="text-white font-semibold">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 px-6 pt-10"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#257F49"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-green-base">
            Meus Pacientes
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="plus" size={24} color="#257F49" />
          </TouchableOpacity>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-4">Resumo</Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-base">
                {patients.length}
              </Text>
              <Text className="text-sm text-gray-600">Total</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-base">
                {patients.filter((p) => p.type === "patient").length}
              </Text>
              <Text className="text-sm text-gray-600">Ativos</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-base">0</Text>
              <Text className="text-sm text-gray-600">Novos</Text>
            </View>
          </View>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-4">
            Pacientes
          </Text>

          {patients.length === 0 ? (
            <View className="items-center py-8">
              <MaterialCommunityIcons
                name="account-group-outline"
                size={48}
                color="#257F49"
              />
              <Text className="text-gray-600 text-center mt-4">
                Nenhum paciente encontrado
              </Text>
            </View>
          ) : (
            patients.map((patient) => (
              <TouchableOpacity
                key={patient.id}
                className="flex-row items-center mb-4 p-4 bg-gray-50 rounded-xl"
                onPress={() => {}}
                activeOpacity={0.7}
              >
                <Image
                  source={{
                    uri: `https://randomuser.me/api/portraits/${
                      patient.id % 2 === 0 ? "women" : "men"
                    }/${patient.id}.jpg`,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 12,
                  }}
                />
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">
                    {patient.name}
                  </Text>
                  <Text className="text-sm text-gray-600">{patient.email}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    ID: {patient.id}
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-xs text-green-700 font-medium">
                    Ativo
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-4">Ações</Text>

          <TouchableOpacity
            className="flex-row items-center mb-4 p-4 bg-green-soft rounded-xl"
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
                Adicionar Paciente
              </Text>
              <Text className="text-sm text-gray-600">
                Cadastrar novo paciente
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#257F49"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 bg-green-soft rounded-xl"
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
          className="bg-green-soft rounded-2xl p-4"
          style={{ borderRadius: 18 }}
        >
          <Text className="text-green-base text-base text-center font-medium">
            💡 Mantenha um acompanhamento próximo dos seus pacientes para
            oferecer o melhor suporte nutricional!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
