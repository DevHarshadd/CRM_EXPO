import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackHeader from "../components/backButtonHeader";
import { useBookmarkStore } from "../zustand/bookMarks";

export default function CourseDetails() {
  const { item } = useLocalSearchParams();
  const course = JSON.parse(item as string);

  const{bookmarks, setBookmarks}=useBookmarkStore()

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const data = await AsyncStorage.getItem("bookmarks");
    if (data) setBookmarks(JSON.parse(data));
  };

  const toggleBookmark = async () => {
    let updated;
    const exists = bookmarks.find((b) => b.id === course.id);

    if (exists) {
      updated = bookmarks.filter((b) => b.id !== course.id);
    } else {
      updated = [...bookmarks, course];
    }

    setBookmarks(updated);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const isBookmarked = bookmarks.some((b) => b.id === course.id);

  const handleEnroll = () => {
    Alert.alert("Success", "You enrolled successfully!");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
<BackHeader title={"Course Details"}/>
      <Image
        source={{ uri: course.picture?.large }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
        {course.name?.first} {course.name?.last}
      </Text>

      <Text style={{ textAlign: "center", marginVertical: 10 }}>
        {course.email}
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Phone: {course.phone}
      </Text>

      <TouchableOpacity
        onPress={toggleBookmark}
        style={{
          backgroundColor: "#ddd",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {isBookmarked ? "Remove Bookmark ⭐" : "Add Bookmark ☆"}
        </Text>
      </TouchableOpacity>

      {/* 🎯 Enroll */}
      <TouchableOpacity
        onPress={handleEnroll}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Enroll
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  onPress={() =>
    router.push({
      pathname: "/webView", 
      params: {
        name: course.name.first,
        email: course.email,
      },
    })
  }
  style={{
    marginTop: 15,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
  }}
>
  <Text style={{ color: "white", textAlign: "center" }}>
    Open Course Content
  </Text>
</TouchableOpacity>
    </View>
  );
}