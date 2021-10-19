import React, { useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery'
import { AuthUserContext } from "../Session";
export default function Home() {
  const [photos, setPhotos] = useState([])
  const [uid, setUid] = useState('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/test')
      .then(res => res.json())
      .then(data => {
        console.log(data[0].width)
        setPhotos(data)
      })
  }, [])

  useEffect(() => {
    if (uid !== null) {
      fetch("http://localhost:4000/checkAdmin", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid: uid })
      })
        .then(res => res.json())
        .then(json => {
          if (json.admin === true) {
            setAdmin(true);
            //console.log(json.admin);
            //return true
          }
        });
    }
  }, [uid]);

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        authUser ? setUid(authUser.uid) : setUid(null);
        return (photos.length ? (<Gallery margin={10} photos={photos} direction={"column"} />) : null);
      }}
    </AuthUserContext.Consumer>
  )
}
