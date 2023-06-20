# docker image build -t file-uploader-fe .
# docker run --name file-uploader-fe --env-file .env -p 3000:3000 file-uploader-fe

FROM node:18.2.0-alpine
WORKDIR /nodejs-header-blocker
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 3000
EXPOSE 3000

CMD ["npm", "run", "start"]