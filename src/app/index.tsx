import { signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "@/firebaseConfig";
import { useEffect, useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, Animated, Dimensions } from "react-native";
import { router } from "expo-router";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { s } from "./styles";
import { colors } from "@/styles/theme";

export default function App() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    const mapRef = useRef<MapView>(null);
    const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current; // Começa fora da tela

    

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        watchPositionAsync(
            {
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (response) => {
                setLocation(response);
                mapRef.current?.animateCamera({
                    center: response.coords,
                });
            }
        );
    }, []);

    // Abre o menu
    const openMenu = () => {
        setMenuVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0, // Move para dentro da tela
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    // Fecha o menu
    const closeMenu = () => {
        Animated.timing(slideAnim, {
            toValue: Dimensions.get("window").width, // Move para fora da tela
            duration: 300,
            useNativeDriver: false,
        }).start(() => setMenuVisible(false));
    };

    const testarLoginFirebase = async (): Promise<void> => {
        const email: string = "elizeuamorim8@gmail.com";
        const senha: string = "123456**@";
      
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, senha);
          Alert.alert("Login bem-sucedido", `Usuário: ${userCredential.user.email}`);
        } catch (error) {
          const err = error as AuthError;
      
          if (err.code === "auth/user-not-found") {
            try {
              const novoUsuario = await createUserWithEmailAndPassword(auth, email, senha);
              Alert.alert("Usuário criado com sucesso", `Email: ${novoUsuario.user.email}`);
            } catch (erroCriar) {
              const criarErr = erroCriar as AuthError;
              Alert.alert("Erro ao criar usuário", criarErr.message);
            }
          } else {
            Alert.alert("Erro ao fazer login", err.message);
          }
        }
      };


    return (
        <View style={s.container}>
            {location && (
                <MapView
                    ref={mapRef}
                    style={s.map}
                    initialRegion={{
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location?.coords.latitude,
                            longitude: location?.coords.longitude,
                        }}
                    />
                </MapView>
            )}

            {/* Botão de três pontinhos no topo direito */}
            <View style={{ position: "absolute", top: 40, right: 340, zIndex: 10 }}>
                <TouchableOpacity onPress={openMenu}>
                    <MaterialIcons name="menu" size={32} color="green" />
                </TouchableOpacity>
            </View>

            {/* Menu Lateral Deslizante */}
            {menuVisible && (
                <Animated.View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 200,
                        height: "100%",
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: { width: -2, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                        padding: 20,
                        transform: [{ translateX: slideAnim }],
                    }}
                >
                    <TouchableOpacity onPress={() => router.navigate("/dicas")}>
                        <Text style={{ padding: 10 }}>Dicas de Saúde</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { alert("perfil em Construção"); }}>
                        <Text style={{ padding: 10 }}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeMenu}>
                        <Text style={{ padding: 10, color: "red" }}>Fechar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={testarLoginFirebase}>
                        <Text style={{ padding: 10 }}>Testar Login Firebase</Text>
                    </TouchableOpacity>

                </Animated.View>
            )}

            {/* Botão GO */}
            <View style={{ position: "absolute", bottom: 32, left: 150, right: 150, marginBottom: 32 }}>
                <TouchableOpacity style={s.button} onPress={() => router.navigate("/About")}>
                    <Text style={s.title}>GO</Text>
                </TouchableOpacity>
            </View>

            {/* Barra Inferior Verde */}
            <View
                style={{
                    width: "95%",
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: colors.green.base,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 30,
                    marginBottom: 5,
                }}
            >
                <TouchableOpacity onPress={() => router.navigate("/home")}>
                    <Text style={s.title}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate("/About")}>
                    <Text style={s.title}>Motorista</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
