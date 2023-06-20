# docker image build -t file-uploader-be .
# docker run --name file-uploader-be --env-file .env -p 8000:8000 -v /d/Kerja/PrivyID/sharing-knowledge/1-docker/be-fe/backend/files:/app/files file-uploader-be

FROM python:3.8-alpine
WORKDIR /app
COPY . .
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
ENV APP_PORT 8000
EXPOSE 8000
CMD ["python3", "main.py"]