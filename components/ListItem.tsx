import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  FadeInRight,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { ADD_TO_FAVORITES } from "@/redux/actionTypes/airbnbDataTypes";

type ListItemProps = {
  item: Listing;
};

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const liked = useSharedValue(item.isLiked ? 1 : 0);
  const isVisible = useSharedValue(1);

  const handleLikePost = () => {
    if (item.isLiked) {
      isVisible.value = 0;
    } else {
      dispatch({ type: ADD_TO_FAVORITES, payload: item });
      liked.value = withSpring(liked.value ? 0 : 1);
    }
  };

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible.value, { duration: 500 }),
    };
  });

  return (
    <View>
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={[styles.listing, animatedStyle]}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image source={{ uri: item.medium_url }} style={styles.image} />
            <View style={{ position: "absolute", right: 30, top: 30 }}>
              <Pressable onPress={handleLikePost}>
                <Animated.View style={fillStyle}>
                  <MaterialCommunityIcons
                    name={"heart"}
                    size={32}
                    color={"red"}
                  />
                </Animated.View>
                <Animated.View
                  style={[StyleSheet.absoluteFillObject, outlineStyle]}
                >
                  <MaterialCommunityIcons
                    name={"heart-outline"}
                    size={32}
                    color={"black"}
                  />
                </Animated.View>
              </Pressable>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: "mon-sb" }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
              <Text style={{ fontFamily: "mon" }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
    backgroundColor: "#FDFFFF",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});
export default ListItem;
