import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/presentation/components/button";
import { SignupUseCase } from "../usecases/signup.usecase";
import { UserApiRepository } from "../data/user-api.repository";
import { useAuth } from "../contexts/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserRegistration() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"patient" | "nutritionist">(
    "patient"
  );
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const signupUseCase = new SignupUseCase(new UserApiRepository());
      const userData = {
        name: name.trim(),
        email: email.trim(),
        password,
        type: userType,
        ...(userType === "patient" && { nutritionistId: 1 }),
        ...(userType === "nutritionist" && { crn: "CRN-3 00000" }),
      };

      const user = await signupUseCase.execute(userData);

      login(user);

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/user-objetives");
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 px-6 pt-10"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-green-base mb-2">
            Criar Conta
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Preencha os dados para se cadastrar
          </Text>
        </View>

        <View
          className="mt-4 bg-white rounded-3xl shadow-md p-6 mb-4 gap-4"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-6 text-center">
            Dados Pessoais
          </Text>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">Nome Completo</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Digite seu nome completo"
              value={name}
              onChangeText={setName}
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">Senha</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-1">
            <Text className="text-base text-gray-700 mb-3">
              Confirmar Senha
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-2">
            <Text className="text-base text-gray-700 mb-3">
              Tipo de Usuário
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className={`flex-1 p-4 rounded-xl border-2 ${
                  userType === "patient"
                    ? "border-green-base bg-green-soft"
                    : "border-gray-300 bg-white"
                }`}
                onPress={() => setUserType("patient")}
                activeOpacity={0.7}
              >
                <View className="items-center">
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color={userType === "patient" ? "#257F49" : "#6B7280"}
                  />
                  <Text
                    className={`font-semibold mt-2 ${
                      userType === "patient"
                        ? "text-green-base"
                        : "text-gray-600"
                    }`}
                  >
                    Paciente
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 p-4 rounded-xl border-2 ${
                  userType === "nutritionist"
                    ? "border-green-base bg-green-soft"
                    : "border-gray-300 bg-white"
                }`}
                onPress={() => setUserType("nutritionist")}
                activeOpacity={0.7}
              >
                <View className="items-center">
                  <MaterialCommunityIcons
                    name="stethoscope"
                    size={24}
                    color={userType === "nutritionist" ? "#257F49" : "#6B7280"}
                  />
                  <Text
                    className={`font-semibold mt-2 ${
                      userType === "nutritionist"
                        ? "text-green-base"
                        : "text-gray-600"
                    }`}
                  >
                    Nutricionista
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title={loading ? "Criando conta..." : "Criar Conta"}
            variant="primary"
            onPress={handleSignup}
            isLoading={loading}
          />
        </View>

        <View className="items-center">
          <Text className="text-gray-600 mb-2">Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-green-base font-semibold text-lg">
              Fazer login
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className="mt-8 bg-green-soft rounded-2xl p-4"
          style={{ borderRadius: 18 }}
        >
          <Text className="text-green-base text-base text-center font-medium">
            💡 Escolha o tipo de usuário correto para ter acesso às
            funcionalidades adequadas!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
