import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";

import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { api } from "@/services/api";
import { colors, fontFamily } from "@/styles/theme";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type marketsProps = PlaceProps & {
    latitude: number | undefined
    longitude: number | undefined
}

const currentLocation = {
    latitude: -14.8967367,
    longitude: -40.8499869
}


export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<marketsProps[]>([])
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories")
            setCategories(data)
            if (data.length > 0) {
                setCategory(data[0].id)
            }

        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Não foi possivél carregar as categorias.")
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                return
            }

            const { data } = await api.get("/markets/category/" + category)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert("Locais", "Não foi possível carregar os locais.")
        }
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync()

            if (granted) {
                const location = await Location.getCurrentPositionAsync()
                console.log(location)
                setLocation(location)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories()
        getCurrentLocation()
    }, [])

    useEffect(() => {
        fetchMarkets()
    }, [category])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Categories
                    data={categories}
                    onSelect={setCategory}
                    selected={category}
                />

                <MapView style={{ flex: 1 }}
                    pointerEvents="box-none"
                    initialRegion={{
                        latitude: location?.coords.latitude ?? currentLocation.latitude,
                        longitude: location?.coords.longitude ?? currentLocation.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                >
                    <Marker
                        identifier="current"
                        coordinate={{
                            /*
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitudde,
                            */

                            latitude: location?.coords.latitude ?? currentLocation.latitude,
                            longitude: location?.coords.longitude ?? currentLocation.longitude,
                        }}
                        image={require("@/assets/location.png")}
                    />
                    {
                        markets.map((item) => (
                            item.latitude !== undefined && item.longitude !== undefined && (
                                <Marker
                                    key={item.id}
                                    identifier={item.id}
                                    coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                    }}
                                    image={require("@/assets/pin.png")}
                                >
                                    <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: colors.gray[600],
                                                    fontFamily: fontFamily.medium,
                                                }}
                                            >{item.name}</Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: colors.gray[600],
                                                    fontFamily: fontFamily.medium,
                                                }}
                                            >{item.description}</Text>
                                        </View>
                                    </Callout>
                                </Marker>
                            )
                        ))
                    }
                </MapView>
            </View>
            <Places data={markets} />
        </View>
    )
}