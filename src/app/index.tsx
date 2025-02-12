import { useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/button"
import { router } from "expo-router"

import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { s } from "./styles";

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

            <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                <Button onPress={() => router.navigate("/home")}>
                    <Button.Title>GO</Button.Title>
                </Button>
            </View>

        </View>
    )
}