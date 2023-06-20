import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import UploadImageCard from './components/UploadImageCard';
const axios = require("axios").default;

function App() {
  const URL = process.env.REACT_APP_BACKEND_URL
  const PORT = process.env.REACT_APP_BACKEND_PORT
  const PROTOCOL = process.env.REACT_APP_BACKEND_PROTOCOL

  const [pictureMedium, setPictureMedium] = useState('');
  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [storedFiles, setStoredFiles] = useState([]);

  const [files, setFile] = useState([]);


  // Can only store 1 file
  const storeFile = (file) => { if (files.length < 1) setFile([...files, ...file]) }

  const getData = async (image_name) => {
    let res = await axios({ method: "get", url: `${PROTOCOL}://${URL}:${PORT}/files` });
    if (res.status === 200) setStoredFiles(res.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const submitFiles = async () => {
    setloadingSubmit(true)
    const firstFile = files[0]
    let formData = new FormData();
    formData.append("file", firstFile.file_data);
    let res = await axios({ method: "post", url: `${PROTOCOL}://${URL}:${PORT}/upload`, data: formData, });
    if (res.status === 200) {
      getData()
      setloadingSubmit(false)
      setFile([])
    }
  }

  return (
    <div className='pt-5'>
      <Navbar />
      <main>
        <Main
          submitFiles={submitFiles}
          setPictureMedium={setPictureMedium} pictureMedium={pictureMedium}
          loadingSubmit={loadingSubmit}
          files={files} setFile={setFile} storeFile={storeFile}
        />
        {
          storedFiles.length > 0 ?
            <div style={{ backgroundColor: '#d1e1ef', paddingTop: '32px', paddingBottom: '32px' }}>
              <div className='text-center'>
                <h5 style={{color: '#13518A'}}>Stored Images</h5>
              </div>
              <div className='text-center'>
                {
                  storedFiles.map((file, idx) =>
                    <UploadImageCard key={idx}>
                      <img style={{ borderRadius: '20px' }} src={`${PROTOCOL}://${URL}:${PORT}/static/${file.id}.png`} alt='stored_images' />
                    </UploadImageCard>)
                }
              </div>
            </div> :
            <div style={{ backgroundColor: '#d1e1ef', paddingTop: '32px', paddingBottom: '32px' }}>
              <div className='text-center'>
                <h5 style={{color: '#13518A'}}>No Stored Images yet</h5>
              </div>
            </div>
        }

      </main>


    </div>
  );
}

export default App;
