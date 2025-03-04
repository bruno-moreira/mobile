import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Place, PlaceProps } from "../place";
import { s } from "./styles"

type Props = {
    data: PlaceProps[]
}

export function Places({ data }: Props) {
    const dimenions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = {
        min: 278,
        max: dimenions.height - 128
    }

    return (
        <BottomSheet 
            ref={bottomSheetRef} 
            snapPoints={[snapPoints.min,snapPoints.max]} 
            handleIndicatorStyle={s.indicator}
            backgroundStyle={s.container}
            enableOverDrag={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Place 
                        data={item} 
                        onPress={() => router.navigate(`/market/${item.id}`)} 
                    />
                )}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>Explore locais perto de você</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </BottomSheet>
    )
}