import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function RegisterScreen({ onBack,register,email ,setEmail,username ,setUsername,password ,setPassword,loading}: any) {
  

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Register
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

    <TouchableOpacity
  onPress={register}
  style={{
    backgroundColor: loading ? "gray" : "black",
    padding: 15,
  }}
  disabled={loading} // 🔥 prevent multiple clicks
>
  <Text style={{ color: "white", textAlign: "center" }}>
    {loading ? "Creating Account..." : "Register"}
  </Text>
</TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: "center", color: "blue" }}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}