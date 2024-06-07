import { View } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Explore = () => {
  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <ListingsMap />
      <ListingsBottomSheet />
    </View>
  );
};

export default Explore;
