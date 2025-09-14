import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { convertUrlToEpub } from "./src/services/converter";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      website: "",
      loading: false,
    };
    this.process = this.process.bind(this);
  }

  async componentDidMount() {
    // alert("Ola");
    await AsyncStorage.getItem("email").then((value) => {
      this.setState({ email: value });
    });

    // Verifica se o app foi aberto com uma URL (deep link)
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      this.handleIncomingURL(initialUrl);
    }

    // Listener para URLs recebidas quando o app já está aberto
    const subscription = Linking.addEventListener("url", (event) => {
      this.handleIncomingURL(event.url);
    });

    // Salva a subscription para cleanup
    this.linkingSubscription = subscription;
  }

  componentWillUnmount() {
    // Remove o listener quando o component é desmontado
    if (this.linkingSubscription) {
      this.linkingSubscription.remove();
    }
  }

  handleIncomingURL = (url) => {
    try {
      console.log("URL recebida:", url);
      
      // Remove o scheme personalizado se presente
      let cleanUrl = url;
      if (url.startsWith('notemount://')) {
        cleanUrl = url.replace('notemount://', '');
      }
      
      // Verifica se é uma URL válida
      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        this.setState({ website: cleanUrl });
        console.log("Website preenchido com:", cleanUrl);
      } else if (cleanUrl.includes('://')) {
        // Se tem outro protocolo, mantém como está
        this.setState({ website: cleanUrl });
        console.log("Website preenchido:", cleanUrl);
      } else {
        // Se não tem protocolo, adiciona https://
        cleanUrl = 'https://' + cleanUrl;
        this.setState({ website: cleanUrl });
        console.log("Website preenchido com protocolo adicionado:", cleanUrl);
      }
    } catch (error) {
      console.error("Erro ao processar URL:", error);
    }
  };

  //ComponentDidUpdate - toda vez que uma state é atualizada faça algo
  async componentDidUpdate(_, prevState) {
    const email = this.state.email;
    if (prevState.email !== email) {
      await AsyncStorage.setItem("email", email);
    }
  }

  async process() {
    try {
      const { email, website } = this.state;
      if (!email.trim()) {
        alert("Por favor, digite um email válido");
        return;
      }
      if (!website.trim()) {
        alert("Por favor, digite uma URL válida");
        return;
      }

      this.setState({ loading: true });
      console.log("Processando:", { email, website });
      const result = await convertUrlToEpub(website, email);
      console.log("Resultado:", result);
      alert("Conversão realizada com sucesso!");
    } catch (error) {
      console.error("Erro na conversão:", error);
      alert(
        "Erro ao processar a conversão. Verifique o console para mais detalhes."
      );
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emailView}>
          <Text>Email</Text>
          <TextInput
            placeholder="Ex: user@example.com"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            style={styles.emailInput}
          />
        </View>
        <View style={styles.websiteView}>
          <Text>Website</Text>
          <TextInput
            placeholder="Ex: www.example.com"
            value={this.state.website}
            onChangeText={(text) => this.setState({ website: text })}
            style={styles.websiteInput}
          />
        </View>
        <TouchableOpacity
          onPress={this.process}
          style={styles.botao}
          disabled={this.state.loading}
        >
          <Text>Processar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
        {this.state.loading && <Text>Carregando...</Text>}
      </View>
    );
  }
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
