# Usar uma imagem Node.js oficial
FROM node:14

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json do diretório pai


# Instalar as dependências
RUN npm install

# Copiar o restante do código do aplicativo
COPY . .

# Expor a porta em que o app estará rodando
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
