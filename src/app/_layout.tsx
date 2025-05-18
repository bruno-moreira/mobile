import { useEffect, useState } from "react";
import { Slot, router, usePathname } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig.js";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);

      const estaNoLogin = pathname === "/login";

      if (!user && !estaNoLogin) {
        router.replace("/login");
      }

      if (user && estaNoLogin) {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, []); // Sem pathname aqui

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
