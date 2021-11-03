import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import "firebase/storage";
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import axios from 'axios';

function CreateProduct() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {


  }, [])



  function uploadHandler(event) {
    event.preventDefault();
    console.log(event)
    const data = new FormData();
    if (event.target.file[0] !== undefined) {
      data.append('file', event.target.files[0]);
      console.log(event.target.files[0])
    }
    
    axios.post('http://localhost:4000/upload', data)
      .then((res) => {
        setPhotos([res.data, ...photos])
      });
  }

  return (
    <div>

      <div>
        <div>
          <form onSubmit={uploadHandler}>
            <label>
              Height:
              <Input type={Input.InputNumber} name="height" placeholder="Basic usage" />
            </label>
            <label>
              width:
              <input type="text" name="width" />
            </label>
            <input type="file" name="file" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        {photos.map(pho => {
          console.log(photos)
          return (
            <img alt={pho.src + "wow"} src={`http://localhost:4000/${pho.src}`} />
          )
        })}
      </div>
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition, ROUTES.SIGN_IN)(CreateProduct);