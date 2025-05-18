// app/login.tsx
import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.replace("/"); // Vai para a tela inicial após login
    } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert("Erro no login", error.message);
        } else {
          Alert.alert("Erro no login", "Ocorreu um erro inesperado.");
        }
      }
      
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{ marginBottom: 20, borderBottomWidth: 1 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
