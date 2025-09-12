import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { convertUrlToEpub } from "./src/services/converter";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");

  async function process() {
    try {
      if (!email.trim()) {
        alert('Por favor, digite um email válido');
        return;
      }
      if (!website.trim()) {
        alert('Por favor, digite uma URL válida');
        return;
      }

      console.log('Processando:', { email, website });
      const result = await convertUrlToEpub(website, email);
      console.log('Resultado:', result);
      alert('Conversão realizada com sucesso!');
    } catch (error) {
      console.error('Erro na conversão:', error);
      alert('Erro ao processar a conversão. Verifique o console para mais detalhes.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.emailView}>
        <Text>Email</Text>
        <TextInput
          placeholder="Ex: user@example.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.emailInput}
        />
      </View>
      <View style={styles.websiteView}>
        <Text>Website</Text>
        <TextInput
          placeholder="Ex: www.example.com"
          value={website}
          onChangeText={(text) => setWebsite(text)}
          style={styles.websiteInput}
        />
      </View>
      <TouchableOpacity onPress={process} style={styles.botao}>
        <Text>Processar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  emailView: {
    width: "85%",
    marginBottom: 12,
  },
  websiteView: {
    width: "85%",
    marginBottom: 12,
  },
  emailInput: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  websiteInput: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  botao: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    borderRadius: 5,
  },
});
