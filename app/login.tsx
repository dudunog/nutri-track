import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/presentation/components/button";
import { LoginUseCase } from "../usecases/login.usecase";
import { UserApiRepository } from "../data/user-api.repository";
import { User } from "../domain/user";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const loginUseCase = new LoginUseCase(new UserApiRepository());
      const user = await loginUseCase.execute({
        email: email.trim(),
        password,
      });

      if (user) {
        if (user.type === "patient") {
          router.replace("/home");
        } else if (user.type === "nutritionist") {
          router.replace("/nutritionist-home");
        }
      } else {
        Alert.alert("Erro", "Email ou senha incorretos");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-green-base mb-2">Login</Text>
        <Text className="text-lg text-gray-600 text-center">
          Preencha os dados para fazer login
        </Text>
      </View>
      <View
        className="mt-4 bg-white rounded-3xl shadow-md p-6 mb-6"
        style={{ borderRadius: 24 }}
      >
        <Text className="text-xl font-bold text-green-base mb-6 text-center">
          Login
        </Text>

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

        <View className="mb-6">
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

        <Button
          title={loading ? "Entrando..." : "Entrar"}
          variant="primary"
          onPress={handleLogin}
          isLoading={loading}
        />
      </View>

      <View className="items-center">
        <Text className="text-gray-600 mb-2">Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => router.push("/user-registration")}>
          <Text className="text-green-base font-semibold text-lg">
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className="mt-8 bg-green-soft rounded-2xl p-4"
        style={{ borderRadius: 18 }}
      >
        <Text className="text-green-base text-base text-center font-medium mb-2">
          💡 Dicas de login:
        </Text>
        <Text className="text-green-base text-sm text-center">
          Paciente: joao@example.com / 123456{"\n"}
          Nutricionista: joao.nutri@nutritrack.com / 123456
        </Text>
      </View>
    </View>
  );
}
