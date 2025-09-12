# 📚 Notemount App

> Aplicativo React Native para converter artigos da web em arquivos EPUB

## 📋 Descrição

O Notemount App é uma aplicação mobile desenvolvida em React Native/Expo que permite aos usuários converter artigos da web em arquivos EPUB. O app funciona como interface para uma API backend que processa o conteúdo e gera os arquivos EPUB.

## ✨ Funcionalidades

- 📧 **Entrada de Email**: Campo para inserir o email do usuário
- 🌐 **URL do Artigo**: Campo para inserir a URL do artigo a ser convertido
- 🔄 **Conversão**: Envio dos dados para API de conversão
- ✅ **Feedback**: Mensagens de sucesso ou erro para o usuário
- 📱 **Interface Responsiva**: Design adaptado para dispositivos móveis

## 🛠️ Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **JavaScript ES6+** - Linguagem de programação
- **Fetch API** - Para requisições HTTP

## 📁 Estrutura do Projeto

```
notemount-app/
├── App.js                    # Componente principal da aplicação
├── index.js                  # Ponto de entrada do app
├── package.json              # Dependências e scripts
├── app.json                  # Configurações do Expo
├── assets/                   # Recursos gráficos
│   ├── icon.png
│   ├── splash-icon.png
│   ├── favicon.png
│   └── adaptive-icon.png
├── files/                    # Diretório para arquivos gerados
└── src/
    └── services/
        └── converter.js      # Serviço para conversão de URLs
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- API backend rodando em `http://localhost:3000`

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/WirisWernek/notemount-app.git
   cd notemount-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o aplicativo**
   ```bash
   npm start
   # ou
   npx expo start
   ```

4. **Execute em diferentes plataformas**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## 🔌 API Backend

O aplicativo requer uma API backend rodando em `http://localhost:3000` com o endpoint:

### POST /convert

**Descrição**: Converte uma URL em arquivo EPUB

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "link": "https://exemplo.com/artigo",
  "email": "usuario@email.com"
}
```

**Resposta de Sucesso**:
```json
{
  "success": true,
  "message": "Conversão realizada com sucesso",
  "filename": "artigo_convertido.epub"
}
```

**Resposta de Erro**:
```json
{
  "success": false,
  "error": "Erro ao processar a URL"
}
```

## 💻 Como Usar

1. **Abra o aplicativo** no seu dispositivo ou emulador
2. **Digite seu email** no campo "Email"
3. **Insira a URL** do artigo que deseja converter no campo "Website"
4. **Clique em "Processar"** para iniciar a conversão
5. **Aguarde a confirmação** de sucesso ou verifique erros no console

## 🎨 Interface

O aplicativo possui uma interface simples e intuitiva:

- **Campo Email**: Para inserir o endereço de email
- **Campo Website**: Para inserir a URL do artigo
- **Botão Processar**: Para enviar os dados e iniciar a conversão
- **Alertas**: Feedback visual para validações e resultados

## 🔍 Validações

- ✅ Email obrigatório e não pode estar vazio
- ✅ URL obrigatória e não pode estar vazia
- ✅ Tratamento de erros de rede
- ✅ Validação de resposta da API

## 🛠️ Desenvolvimento

### Estrutura do Código

- **App.js**: Componente principal com a interface e lógica de negócio
- **converter.js**: Serviço responsável pelas chamadas à API

### Estados do App

```javascript
const [email, setEmail] = React.useState("");     // Estado do email
const [website, setWebsite] = React.useState(""); // Estado da URL
```

### Função Principal

```javascript
async function process() {
  // Validações
  // Chamada para API
  // Tratamento de resposta/erro
}
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Tela em branco**
   - Verifique se a API backend está rodando
   - Confirme se o endpoint está acessível

2. **Erro de rede**
   - Verifique a conexão com a internet
   - Confirme se o endereço da API está correto

3. **Erro de validação**
   - Certifique-se de preencher email e URL
   - Verifique se a URL está no formato correto

### Logs de Debug

O aplicativo registra logs detalhados no console:
```javascript
console.log('Processando:', { email, website });
console.log('Resultado:', result);
console.error('Erro na conversão:', error);
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Wiris Wernek**
- GitHub: [@WirisWernek](https://github.com/WirisWernek)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Changelog

### v1.0.0 (2025-09-11)
- ✨ Versão inicial do aplicativo
- ✅ Interface para conversão de URLs em EPUB
- ✅ Integração com API backend
- ✅ Validações de entrada
- ✅ Tratamento de erros
