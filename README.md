# File-uploader
Project ini digunakan untuk mempelajari fungsi dasar Dockerfile. 
Beberapa hal yang dapat dipelajari antara lain :
- Penggunaan Database (Mencatat files)
- Penggunaan Volume (Data Persistent)
- Penggunaan Network (Komunikasi Antar Docker & Outside)

## Desc : 
Terdapat 2 aplikasi
- Frontend NodeJS
- Backend Python

## Cara Kerja : 
Frontend dapat mengambil foto dengan camera atau upload dengan gambar. Frontend mengirimkan gambar ke Backend (RestAPI POST).

Backend menerima gambar, kemudian disimpan kedalam folder /files

Backend terhubung dengan MySQL untuk men-data file gambar yang tersimpan (terupload).

Frontend mengupdate data dengan mengirimkan "/getFiles" GET RestAPI, dan mendapatkan list files terbaru. Kemudian, Frontend menampilkan list file terbaru.

<br/>

---
## How To Run Front-End :
Requirements :
- NodeJS 16.16.0
```
cd backend
npm install
npm run start
```

<br/>

---
## How To Run Back-End :
Requirements :
- Python 3.8
```
cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt
python main.py
```
