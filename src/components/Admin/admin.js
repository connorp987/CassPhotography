import React, { useEffect, useState } from 'react'
import { Upload, Button, Image, Space, Popover, Select, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import firebase from "firebase/app";
import "firebase/storage";
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';

function CreateProduct() {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [allPictures, setAllPictures] = useState([])
  const [categories, setCategories] = useState([])

  const { Option } = Select;

  useEffect(() => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: firebase.auth().currentUser })
    };
    fetch('http://localhost:4000/getCreateProduct', requestOptions)
      .then(function (response) {
        return response.json()
      })
      .then(data => setAllPictures(Object.values(data))) //Object.values(data).forEach(val => console.log(val))

      fetch('http://localhost:4000/getCategories', requestOptions)
      .then(function (response) {
        return response.json()
      })
      .then(data => setCategories(Object.values(data))) //Object.values(data).forEach(val => console.log(val))
  }, [])

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function createCategory(e) {
    fetch('http://localhost:4000/createCategory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: firebase.auth().currentUser, newCategory: e.target.value })
    })
      .then(function (response) {
        return response.text().then(function (text) {
          return text ? JSON.parse(text) : {}
        })
      })
      .then(data => setCategories(oldArray => [...oldArray, e.target.value]))
  }

  const uploadImage = async options => {
    const { onSuccess, onError, file } = options;
    try {
      let ref = firebase.storage().ref().child(`${file.name}`);
      ref.put(file).then((snapshot) => {
        //console.log(snapshot);
        ref.getDownloadURL()
          .then((url) => {
            let newElement = {
              uid: file.uid,
              name: file.name,
              status: 'done',
              url: url,
              thumbUrl: url,
            }
            setFileList(oldArray => [...oldArray, newElement]);
            fetch('http://localhost:4000/createProduct', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ user: firebase.auth().currentUser, productData: newElement })
            })
              .then(function (response) {
                return response.text().then(function (text) {
                  return text ? JSON.parse(text) : {}
                })
              })
              .then(data => console.log(data))
            console.log(newElement)
          })
          .catch((error) => {
            console.log(error)
          });
      });


      onSuccess("Ok");
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  };

  const deleteUpload = (file) => {
    let ref = firebase.storage().ref().child(`${file.name}`);
    ref.delete().catch((error) => {
      console.log(error)
    });
  }

  const onPreview = async file => {
    setPreviewVisible(!previewVisible)
  };


  return (
    <div>
      <Space direction="vertical" style={{ width: '50%', marginLeft: '25%' }} size="large">
        <Upload
          name="image"
          accept="image/*"
          onPreview={onPreview}
          customRequest={uploadImage}
          onRemove={deleteUpload}
          listType="picture"
          defaultFileList={fileList}
          multiple
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Space>

      <div>
        <Image.PreviewGroup style={{ marginRight: '20px' }}>
          {allPictures.map((data, i) => {
            let content = (
              <div>
                <div>Select Category:</div>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue
                  placeholder="Please select"
                  onChange={handleChange}
                >
                  {categories.map((data, i) => (<Option key={i.toString(31) + i}>{data}</Option>))}
                </Select>
                <Input onPressEnter={createCategory} placeholder="Add new Category and press Enter" />
                <br />
                <Button>Delete (not yet working)</Button>
              </div>
            );

            return (<Popover content={content} title={data.name}><Image style={{ marginRight: '200' }} key={i} width={200} src={data.url} /></Popover>)
          })}
        </Image.PreviewGroup>

      </div>
    </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition, ROUTES.SIGN_IN)(CreateProduct);