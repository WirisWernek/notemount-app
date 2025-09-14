# NoteMount App - Deep Linking Guide

## Funcionalidade de Compartilhamento

O app foi configurado para aparecer nas opções de compartilhamento quando você compartilha uma URL de qualquer navegador ou aplicativo.

### Como funciona:

1. **Compartilhamento de URL**: Quando você compartilha uma URL de qualquer navegador (Chrome, Firefox, etc.), o NoteMount App aparecerá nas opções de compartilhamento.

2. **Preenchimento automático**: Ao selecionar o app, ele será aberto automaticamente com o campo "Website" preenchido com a URL compartilhada.

3. **Deep Links**: O app também pode ser aberto através de URLs personalizadas:
   - `notemount://exemplo.com`
   - URLs diretas: `https://exemplo.com`

### Configurações implementadas:

#### 1. app.json
- Adicionado `scheme: "notemount"` para URLs personalizadas
- Configurado `intentFilters` para Android:
  - **VIEW**: Para abrir URLs HTTP/HTTPS
  - **SEND**: Para receber conteúdo compartilhado
- Configurado `associatedDomains` para iOS

#### 2. App.js
- Importado `expo-linking`
- Adicionado listener para URLs recebidas
- Implementado `handleIncomingURL()` para processar URLs
- Configurado `componentDidMount()` para capturar URL inicial
- Adicionado `componentWillUnmount()` para limpeza

#### 3. AndroidManifest.xml
- Configurado intent filters específicos para Android
- Suporte a compartilhamento de texto/URLs
- Permissões necessárias

### Como testar:

#### No Android:
1. Abra qualquer navegador (Chrome, Firefox, etc.)
2. Navegue para um site qualquer
3. Toque no botão "Compartilhar"
4. Procure por "notemount-app" nas opções
5. Selecione o app
6. O app deve abrir com a URL preenchida no campo "Website"

#### URLs de teste diretas:
- `adb shell am start -W -a android.intent.action.VIEW -d "notemount://google.com" com.notemountapp`
- `adb shell am start -W -a android.intent.action.VIEW -d "https://google.com" com.notemountapp`

#### No iOS:
1. Similar ao Android, use o botão compartilhar do Safari
2. Procure pelo app nas opções de compartilhamento

### Logs para debug:
O app registra no console:
- "URL recebida: [url]"
- "Website preenchido com: [url]"
- Erros de processamento

### Próximos passos:
1. Faça build do app: `expo build:android` ou `expo build:ios`
2. Instale no dispositivo físico para testar completamente
3. Teste compartilhamento de diferentes navegadores
4. Verifique se o app aparece nas opções de compartilhamento

### Dependências instaladas:
- `expo-linking`: Para lidar com deep links e URLs recebidas

### Observações importantes:
- A funcionalidade de compartilhamento funciona melhor em dispositivos físicos
- No emulador, use comandos ADB para simular deep links
- URLs sem protocolo recebem automaticamente "https://"
- O app mantém o estado da URL mesmo após fechar e reabrir