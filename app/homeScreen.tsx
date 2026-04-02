import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/header";
import { router } from "expo-router";
import { courseListRequest } from "../services/courseListRequests";
import { useBookmarkStore } from "../zustand/bookMarks";

export default function HomeScreen({ setIsLoggedIn }: any) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const{bookmarks, setBookmarks}=useBookmarkStore()
  const [refreshing, setRefreshing] = useState(false);
const [showBookmarks, setShowBookmarks] = useState(false);

  const handleRequest = async () => {
    try {
      const allBookMarks=await AsyncStorage.getItem("bookmarks")
setBookmarks(allBookMarks ? JSON.parse(allBookMarks) : []);
      const data = await courseListRequest();
      setCourses(data?.data || []);
    } catch (error) {
      console.log("Error fetching course list:", error);
    }
  };

  useEffect(() => {
    handleRequest();
   
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleRequest();
    setRefreshing(false);
  };


  const toggleBookmark = async (item: any) => {
    const exists = bookmarks.find((b) => b.id === item.id);
let updated;
    if (exists) {
      updated=bookmarks.filter((b) => b.id !== item.id)
      setBookmarks(updated);
          await AsyncStorage.setItem("bookmarks", JSON.stringify(updated));

    } else {
      updated=[...bookmarks, item]
      setBookmarks(updated);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(updated));
    }
  };


  let filteredCourses = courses.filter((item: any) => {
    const name = `${item.name?.first} ${item.name?.last}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });
  
const renderItem = ({ item }: any) => {
  const isBookmarked = bookmarks.some((b) => b.id === item.id);

  return (
    <TouchableOpacity
    onPress={()=>{
     router.push({
  pathname: "/courseDetails",
  params: { item: JSON.stringify(item) }
})
    }}
      style={{
        marginHorizontal: 10,
        marginVertical: 6,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.picture?.thumbnail }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginRight: 12,
          }}
        />

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.name?.first} {item.name?.last}
          </Text>

          <Text style={{ color: "gray", marginTop: 2 }}>
            {item.email}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => toggleBookmark(item)}>
        <Text style={{ fontSize: 22 }}>
          {isBookmarked ? "⭐" : "☆"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <Header setCurrentScreen={() => { }} />
      <TextInput
        placeholder="Search users..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderRadius: 8,
        }}
      /><TouchableOpacity
  onPress={() => setShowBookmarks(!showBookmarks)}
  style={{
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 8,
  }}
>
  <Text style={{ color: "white", textAlign: "center" }}>
    {showBookmarks ? "Show All" : "Show Bookmarks"}
  </Text>
</TouchableOpacity>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={showBookmarks? bookmarks:filteredCourses}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()} // ✅ IMPORTANT
      />
    </View>
  );
}