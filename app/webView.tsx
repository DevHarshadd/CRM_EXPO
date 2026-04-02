import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import BackHeader from "../components/backButtonHeader";

export default function WebviewScreen() {
  const { name, email } = useLocalSearchParams();

  const htmlContent = `
    <html>
      <body style="font-family: Arial; text-align: center;">
        <h1>${name}</h1>
        <p>Email: ${email}</p>
        <p>This is course content inside WebView 🚀</p>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
        <BackHeader title={"Web View"}/>
        
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
      />
    </View>
  );
}