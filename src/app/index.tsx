import { useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router"

import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { s } from "./styles";
import { colors, fontFamily } from "@/styles/theme";

export default function App() {
    const [location, setLocation] = useState<LocationObject | null>(null);

    const mapRef = useRef<MapView>(null)

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition)
        }
    }

    useEffect(() => {
        requestLocationPermission();
    }, []);


    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response)
            mapRef.current?.animateCamera({
                //pitch: 70,
                center: response.coords
            })
        })
    }, [])

    return (
        <View style={s.container}>
            {
                location &&
                <MapView
                    ref={mapRef}
                    style={s.map}
                    initialRegion={{
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location?.coords.latitude,
                            longitude: location?.coords.longitude,
                        }}
                    />
                </MapView>
            }

            <View style={{ position: "absolute", bottom: 32, left: 150, right: 150, marginBottom: 32 }}>
                <TouchableOpacity style={s.button} onPress={() => router.navigate("/About")}>
                    <Text style={s.title}>GO</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                width: "95%",
                height: 50,
                borderRadius: 15,
                backgroundColor: colors.green.base,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 30,
                marginBottom: 5,
            }}>
                <TouchableOpacity onPress={() => router.navigate("/home")}>
                     <Text style={s.title}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate("/About")}>
                     <Text style={s.title}>Motorista</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}