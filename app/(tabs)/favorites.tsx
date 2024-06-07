import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ListItem from "@/components/ListItem";
import { Listing } from "@/interfaces/listing";
import { defaultStyles } from "@/constants/styles";

const Wishlists = () => {
  const state = useSelector((state: RootState) => state.airbnbDataReducer);
  const { favorites } = state;
  const memoizedFavorites = useMemo(() => favorites, [favorites]);
  const listRef = useRef<FlatList>(null);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.FlatList}>
        <FlatList
          renderItem={({ item }: { item: Listing }) => <ListItem item={item} />}
          data={memoizedFavorites}
          ref={listRef}
        />
      </View>
    </SafeAreaView>
  );
};

export default Wishlists;

const styles = StyleSheet.create({
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 18,
    marginTop: 4,
  },
  FlatList: {
    backgroundColor: "#FDFFFF",
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
