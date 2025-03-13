# Estágio 1: Construção da aplicação
FROM node:18.13.0-alpine AS builder

WORKDIR /app

# Copiando os arquivos de configuração do NPM e instalando dependências
COPY package*.json ./
RUN npm install

# Copiando o restante dos arquivos da aplicação e construindo a aplicação
COPY . .
RUN npm run build

# Estágio 2: Servindo a aplicação com Nginx
FROM nginx:1.27.0

# Copiando os arquivos construídos para o diretório que o Nginx usa para servir os arquivos
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
