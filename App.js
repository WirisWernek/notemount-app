import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { convertUrlToEpub } from './src/services/converter'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            artigo: '',
            api: '',
            loading: false,
        }
        this.process = this.process.bind(this)
    }

    async componentDidMount() {
        // alert("Ola");
        await AsyncStorage.getItem('email').then((value) => {
            this.setState({ email: value ? value : '' })
        })
        await AsyncStorage.getItem('api').then((value) => {
            this.setState({ api: value ? value : '' })
        })
    }

    //ComponentDidUpdate - toda vez que uma state é atualizada faça algo
    async componentDidUpdate(_, prevState) {
        const email = this.state.email
        const api = this.state.api
        if (prevState.email !== email) {
            await AsyncStorage.setItem('email', email)
        }
        if (prevState.api !== api) {
            await AsyncStorage.setItem('api', api)
        }
    }

    async process() {
        try {
            const { email, artigo, api } = this.state
            if (!email.trim()) {
                alert('Por favor, digite um email válido')
                return
            }
            if (!artigo.trim()) {
                alert('Por favor, digite uma URL válida')
                return
            }
            if (!api.trim()) {
                alert('Por favor, digite uma API válida')
                return
            }

            this.setState({ loading: true })
            console.log('Processando:', { email, artigo })
            const result = await convertUrlToEpub(artigo, email, api)
            console.log('Resultado:', result)
            alert('Conversão realizada com sucesso!')
        } catch (error) {
            console.error('Erro na conversão:', error)
            alert('Erro ao processar a conversão. Verifique o console para mais detalhes.')
        }
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#101215',
                    }}
                >
                    <ActivityIndicator size='large' color='#FFF' />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.customView}>
                    <Text style={styles.customLabel}>API</Text>
                    <TextInput
                        placeholder='Ex: api.example.com'
                        value={this.state.api}
                        onChangeText={(text) => this.setState({ api: text })}
                        style={styles.customInput}
                    />
                </View>
                <View style={styles.customView}>
                    <Text style={styles.customLabel}>Email</Text>
                    <TextInput
                        placeholder='Ex: user@example.com'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                        style={styles.customInput}
                    />
                </View>
                <View style={styles.customView}>
                    <Text style={styles.customLabel}>Artigo</Text>
                    <TextInput
                        placeholder='Ex: www.example.com'
                        value={this.state.artigo}
                        onChangeText={(text) => this.setState({ artigo: text })}
                        style={styles.customInput}
                    />
                </View>
                <TouchableOpacity onPress={this.process} style={styles.botao} disabled={this.state.loading}>
                    <Text style={styles.botaoText}>Processar</Text>
                </TouchableOpacity>
                <StatusBar style='auto' />
                {this.state.loading && <Text>Carregando...</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101215',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    customView: {
        width: '85%',
        marginBottom: 12,
    },
    customLabel: {
        color: '#f9f9f9',
        fontWeight: '700',
        marginBottom: 4,
    },
	botaoText: {
		color: '#f9f9f9',
		fontWeight: '700',
	},
    customInput: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 5,
        fontSize: 15,
        color: '#000',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    botao: {
        marginTop: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
		color: '#f9f9f9',
        fontWeight: '700',
        borderRadius: 5,
        backgroundColor: '#fb4b57',
        padding: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
})
