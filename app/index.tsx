// app/index.tsx
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "../components/register";
import { Login } from "../services/loginRequests";
import { registerRequest } from "../services/registerRequest";
import HomeScreen from "./homeScreen";
import * as Notifications from "expo-notifications";
import { useBookmarkStore } from "../zustand/bookMarks";
import { showNotification } from "../utils/notifications";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isregister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { bookmarks, setBookmarks } = useBookmarkStore();

  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    if (bookmarks.length === 5) {
      showNotification("Nice! ⭐", "You bookmarked 5 courses");
    }
  }, [bookmarks.length]);
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Permission required for notifications");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error checking token:", error);
      }
    };
    checkLogin();
  }, []);

  const saveToken = async (token: string, user: any) => {
    try {
      await AsyncStorage.setItem("token", token);

      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Please enter email and password");
        return;
      }
      setLoading(true);
      const loginData = await Login(email.trim(), password.trim());
      const token = loginData?.data?.accessToken;
      if (!token) throw new Error("No token received");
      await saveToken(token, loginData.data.user);
      Alert.alert("Success", "Login successful");
      setIsLoggedIn(true);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      if (!email || !password || !username) {
        Alert.alert("Error", "All fields required");
        return;
      }
      setLoading(true);
      const res = await registerRequest(
        email.trim(),
        password.trim(),
        username.trim(),
      );
      if (res?.success) {
        Alert.alert("Success", "Account created");
        setIsRegister(false);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <HomeScreen setIsLoggedIn={setIsLoggedIn} />;
  }

  if (isregister) {
    return (
      <RegisterScreen
        onBack={() => setIsRegister(false)}
        register={handleRegister}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loading={loading}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsRegister(true)}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: "center" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "black", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center" },
});
