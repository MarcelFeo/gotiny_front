# 🚀 GoTiny - Encurtador de URLs

[▶️ Assistir demo no YouTube](https://youtu.be/0lB5T_ID378)


**Transforme URLs longas em links elegantes e fáceis de compartilhar**

[Demo](#-demonstração) • [Recursos](#-recursos) • [Instalação](#-instalação) • [Uso](#-uso) • [API](#-api) • [Tecnologias](#-tecnologias)

</div>

---

## 📋 Sobre o Projeto

GoTiny é um encurtador de URLs moderno e minimalista que permite transformar links longos em URLs curtas e fáceis de compartilhar. Com uma interface clean e intuitiva, oferece geração automática de QR Codes e estatísticas em tempo real.

### ✨ Recursos

- 🎯 **Encurtamento Instantâneo** - Transforme URLs longas em links curtos em segundos
- 📱 **QR Code Automático** - Geração automática de QR Code para cada link encurtado
- 💾 **Download de QR Code** - Baixe o QR Code em formato PNG
- 📊 **Contador de Links** - Acompanhe quantos links você já criou
- 🎨 **Interface Moderna** - Design clean e futurista com animações suaves
- 📋 **Cópia Rápida** - Copie o link encurtado com um único clique
- ⌨️ **Atalhos de Teclado** - Navegação rápida com atalhos (CMD/CTRL + K, ESC)
- 🌙 **Dark Mode** - Interface elegante em tema escuro
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Validação em Tempo Real** - Validação instantânea de URLs

---


### Recursos Visuais
- ⚡ **Animações Suaves** - Transições elegantes em todas as interações
- 🎨 **Texturas Dinâmicas** - Efeito grain animado no fundo
- 💫 **Micro-interações** - Feedback visual em cada ação
- 🌈 **Gradientes Modernos** - Paleta de cores cyan/purple

---

## 🚀 Instalação

### Pré-requisitos

- **Backend (Spring Boot)**
  - Java 17+
  - Maven ou Gradle
  - Banco de dados (PostgreSQL, MySQL, etc.)

- **Frontend**
  - Navegador moderno (Chrome, Firefox, Safari, Edge)
  - Nenhuma dependência adicional necessária

### 📦 Configuração do Backend

1. **Clone o repositório do backend**
```bash
git clone https://github.com/MarcelFeo/GoTiny.git
cd GoTiny
```

2. **Configure o banco de dados**
```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gotiny
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```


4. **Execute a aplicação**
```bash
mvn spring-boot:run
# ou
./gradlew bootRun
```

O backend estará rodando em `http://localhost:8081`

### 🎨 Configuração do Frontend

1. **Clone ou baixe os arquivos frontend**
```bash
# Estrutura de arquivos
gotiny-frontend/
├── index.html
├── style.css
└── script.js
```

2. **Configure a URL da API** (se necessário)
```javascript
// script.js - linha 2
const API_BASE_URL = 'http://localhost:8081';
```

3. **Abra o arquivo HTML**

```

---

## 💻 Uso

### Encurtando uma URL

1. Cole ou digite a URL completa no campo de entrada
2. Clique em **"Encurtar"** ou pressione Enter
3. Aguarde a confirmação de sucesso
4. Copie o link curto ou baixe o QR Code

### Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `CMD/CTRL + K` | Focar no campo de entrada |
| `ESC` | Resetar o formulário |
| `Enter` | Submeter URL |

### Funcionalidades Extras

- **Copiar Link**: Clique no ícone de cópia ao lado da URL curta
- **Download QR Code**: Clique em "Baixar QR Code" para salvar a imagem
- **Criar Novo Link**: Clique em "Criar outro link" para resetar o formulário
- **Contador de Links**: Visualize quantos links você já criou (salvo localmente)

---

## 🔌 API

### Endpoints Disponíveis

#### `POST /gotiny`
Encurta uma URL longa.

**Request:**
```json
{
  "urlLong": "https://www.exemplo.com/uma/url/muito/longa/para/compartilhar"
}
```

**Response:**
```json
{
  "id": 1,
  "urlLong": "https://www.exemplo.com/uma/url/muito/longa/para/compartilhar",
  "urlShort": "kAY6wz",
  "redirectUserUrl": "http://localhost:8081/r/kAY6wz",
  "urlQrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "urlCreated_at": "2024-02-06T10:30:00"
}
```

#### `GET /r/{urlShort}`
Redireciona para a URL original.

**Exemplo:**
```
GET http://localhost:8081/r/kAY6wz
→ Redireciona para: https://www.exemplo.com/uma/url/muito/longa/para/compartilhar
```

---

## 🛠️ Tecnologias

### Frontend

| Tecnologia | Descrição |
|------------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estrutura semântica |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilização e animações |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica e interatividade |
| ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat&logo=google&logoColor=white) | Tipografia (Syne, DM Sans) |

### Backend

| Tecnologia | Descrição |
|------------|-----------|
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring&logoColor=white) | Framework Java |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white) | Linguagem de programação |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) | Banco de dados (opcional) |


## 📁 Estrutura do Projeto

```
gotiny/
│
├── frontend/
│   ├── index.html          # Estrutura HTML
│   ├── style.css           # Estilos e animações
│   └── script.js           # Lógica JavaScript
│
└── backend/
    ├── src/
    │   └── main/
    │       └── java/
    │           └── com/gotiny/
    │               ├── controller/
    │               │   └── LinkController.java
    │               ├── service/
    │               │   └── LinkService.java
    │               ├── model/
    │               │   └── Link.java
    │               └── config/
    │                   └── CorsConfig.java
    └── pom.xml
```

---

## 🎨 Paleta de Cores

```css
--bg-primary:      #0a0a0f    /* Fundo principal */
--bg-secondary:    #13131a    /* Fundo secundário */
--bg-tertiary:     #1a1a24    /* Fundo terciário */
--text-primary:    #f8f8f9    /* Texto principal */
--text-secondary:  #a0a0b0    /* Texto secundário */
--accent-primary:  #00d9ff    /* Cyan */
--accent-secondary: #7c3aed   /* Purple */
--success:         #10b981    /* Verde sucesso */
--error:           #ef4444    /* Vermelho erro */
```

---

## 🐛 Troubleshooting

### Erro de CORS

**Problema:** `Access to fetch at 'http://localhost:8081/gotiny' has been blocked by CORS policy`

**Solução:** Configure o CORS no backend (veja seção de Instalação)

### QR Code não aparece

**Problema:** Imagem do QR Code não carrega

**Soluções:**
1. Verifique se a API está retornando o campo `urlQrCode`
2. Abra o console (F12) e verifique os logs
3. O frontend gera automaticamente via QR Server API como fallback

### URL curta não funciona

**Problema:** Link encurtado retorna 404

**Solução:** Certifique-se que o endpoint `/r/{urlShort}` está configurado corretamente no backend

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---


## 👨‍💻 Marcel Féo

Desenvolvido com ❤️ e muito código

- **GitHub:** [@MarcelFeo](https://github.com/MarcelFeo)
- **LinkedIn:** [Marcel Fernando Lobo de Féo](https://linkedin.com/in/marcelfeo)
- **Email:** marcelfeo29@exemplo.com

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

[![GitHub Stars](https://img.shields.io/github/stars/seu-usuario/gotiny?style=social)](https://github.com/seu-usuario/gotiny)
[![GitHub Forks](https://img.shields.io/github/forks/seu-usuario/gotiny?style=social)](https://github.com/seu-usuario/gotiny)

</div>
