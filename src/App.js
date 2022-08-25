import {Home} from "./Home";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Picture} from "./Picture";
import {useEffect, useRef, useState} from "react";

function App() {

    const [image, setImage] = useState('')
    // const [newImage, setNewImage] = useState('')
    // const [init, setInit] = useState(false)
    const [images, setImages] = useState([])

    const cbUpdateHomeImage = image => {
        setImage(image)
    }

    // const cbUpdateHomeImages = images => {
    //     setImages(images)
    // }

    //
    // const cbInitImage = image => {
    //     init || setNewImage(image)
    //     setInit(true)
    // }

    return (
        <div className="App"
             style={{background: `url('${image.regular}') no-repeat center center/cover fixed`}}
        >
            {/*<Home cbUpdateHomeImage={cbUpdateHomeImage}/>*/}
            <Routes>
                <Route path="/home" element={
                    <Home
                        cbUpdateHomeImage = {cbUpdateHomeImage}
                        // cbUpdateHomeImages = {cbUpdateHomeImages}
                    />} />

                <Route path="/picture/:id" element={<Picture
                    // image={image} cbUpdateNewImage={cbUpdateNewImage}
                />} />
                <Route path="/" element={<Navigate to="/home" />} />
                {/*<Route path="/picture/:id"*/}
                {/*       element={redirect ? <Navigate to="/home"/> : <Picture />} />*/}
            </Routes>
        </div>
    )
}

export default App;
