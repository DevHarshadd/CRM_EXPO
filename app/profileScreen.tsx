import { router } from "expo-router";
import { View, Text, TouchableOpacity,StyleSheet,Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackHeader from "../components/backButtonHeader";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    router.replace("/");
  };

  return (
  <View style={styles.container}>
<BackHeader title={"Profile Screen"}/>


  <View style={styles.card}>
    {user && (
      <>
        <Image
          source={{
            uri:
              user?.avatar?.url ||
              "https://i.pravatar.cc/150?img=5",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user.username}</Text>

        <Text style={styles.email}>{user.email}</Text>

        <Text style={styles.role}>{user.role}</Text>
      </>
    )}
  </View>

  <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
</View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },

  backBtn: {
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    color: "#007AFF",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },

    elevation: 4,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
       borderWidth: 2,
    borderColor: "red",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },

  role: {
    fontSize: 14,
    color: "#555",
  },

  logoutBtn: {
    marginTop: 30,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
  },

  logoutText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});