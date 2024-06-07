import Colors from "@/constants/Colors";
import { mockMessages } from "@/constants/utils";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Inbox = () => {
  const [messages, setMessages] = useState(mockMessages);

  const filterBySearch = (searched: string) => {
    if (!searched) {
      setMessages(mockMessages);
    } else {
      const query = searched.toLocaleLowerCase();
      const filtred = messages.filter((message) =>
        message.sender.toLocaleLowerCase().includes(query)
      );
      setMessages(filtred);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Ionicons name="search" size={24} style={styles.searchIcon} />
        <TextInput
          onChangeText={filterBySearch}
          style={styles.searchBtn}
          placeholder="Search conversations..."
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.sender}</Text>
              <Text style={{ color: Colors.grey, fontFamily: "mon" }}>
                {item.message}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={{ color: Colors.grey, fontFamily: "mon" }}>
                {item.time}
              </Text>
              <View style={styles.roundButton}>
                <Text style={{ fontSize: 15, color: "white" }}>
                  {item.unreadCount}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.plusButton}>
        <Entypo name="new-message" size={30} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
  },
  searchBtn: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    paddingStart: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  searchIcon: { position: "absolute", zIndex: 100, top: 10, left: 14 },
  separator: {
    height: 20, // İki mesaj kutusu arasındaki boşluk yüksekliği
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  timeContainer: {
    alignItems: "flex-end",
    gap: 5,
  },
  roundButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    position: "absolute",
    right: 25,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 50,
    paddingLeft: 3,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Inbox;
