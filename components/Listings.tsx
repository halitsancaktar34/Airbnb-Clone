import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/styles";
import ListItem from "./ListItem";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Listing } from "@/interfaces/listing";

interface Props {
  category: string;
  refresh: number;
}

const Listings = ({ category, refresh }: Props) => {
  const state = useSelector((state: RootState) => state.airbnbDataReducer);
  const { items } = state;
  const memoizedData = useMemo(() => items, [items]);

  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [category]);

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={({ item }: { item: Listing }) => <ListItem item={item} />}
        data={loading ? [] : memoizedData}
        ListHeaderComponent={
          <Text style={styles.info}>{memoizedData.length} Homes</Text>
        }
        ref={listRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;
