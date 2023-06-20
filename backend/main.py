from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv
load_dotenv()
import os

# Set up database connection
from db_connector import Database
db = Database()

# Set up FastAPI
fastApiApp = FastAPI()
fastApiApp.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

fastApiApp.mount("/static", StaticFiles(directory="files"), name="static")

@fastApiApp.get('/files')
async def files_index():
  return db.query(query=f"SELECT * FROM files;")

@fastApiApp.post('/upload')
async def upload(file: UploadFile = File(...)):
  im = Image.open(BytesIO(await file.read()))
  data = db.query(query=f"INSERT INTO files VALUES (NULL);", autoCommit=True)

  if 'id' not in data["data"]:
    return {'message': 'Server Error'}
  
  inserted_id = data["data"]["id"]
  
  im.save('./files/' + str(inserted_id) + '.png', format="PNG")
  return {'message': 'Success Insert File ' + str(inserted_id)}

if __name__ == "__main__":
  uvicorn.run(fastApiApp, host='0.0.0.0', port=int(os.environ.get("APP_PORT", 8000)))