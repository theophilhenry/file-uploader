import React from 'react'
import Dropzone from './Dropzone'

const ImageInput = (props) => {
  return (
    <div>
      <h5 className='d-flex justify-content-center'>File Drag n Drop</h5>
      <p className='mb-4 d-flex justify-content-center'>Please Upload A Square Image (1:1)</p>
      <Dropzone storeFiles={props.storeFiles} files={props.files} clearFile={props.clearFiles}  clearPictureMedium={props.clearPictureMedium}/>
    </div>
  )
}

export default ImageInput