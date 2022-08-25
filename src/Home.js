import {useEffect, useState} from "react";
import {CityInput} from "./CityInput";
import {ImageList} from "./ImageList";
import './Home.scss'
import {useLocation, useNavigate} from "react-router-dom";

export const Home = ({cbUpdateHomeImage}) => {
    let {state} = useLocation() || {}
    const [prevImage, setPrevImage] = useState('')
    const [prevImages, setPrevImages] = useState([])
    const [bgImage, setBgImage] = useState('')
    const [images, setImages] = useState([])
    const [firstImage, setFirstImage] = useState('')
    const [firstImages, setFirstImages] = useState([])

    // const [index, setIndex] = useState(null)
    // const [redirect, setRedirect] = useState(false)

    // let navigate = useNavigate()
    //
    // const jumpTo = (path) => {
    //     /*can include more logic actions in history.push*/
    //     navigate(path, {replace: true}) // replace true or false to replace the page in history
    // }

    // update the index
    // useEffect(() => {
    //     redirect && jumpTo(`/picture/${index}`)
    // }, [index])

    const getBgImage = (current, first, prev) => {
        if (current !== first ) {
            cbUpdateHomeImage(current)
        } else {
            if (prev === '') {
                cbUpdateHomeImage(first)
            } else {
                cbUpdateHomeImage(prev)
            }
        }
    }

    // update the title of website
    useEffect(() => {
        document.title = !!bgImage && bgImage?.des && bgImage.des ? bgImage.des.charAt(0).toUpperCase() + bgImage.des.slice(1) : 'Loading...'
        getBgImage(bgImage, firstImage, prevImage)
        // redirect && jumpTo(`/picture/${index}`)
        // setRedirect(true)
    }, [bgImage])

    // set background image at initialization
    useEffect(() => {
        if (images.length > 0) {
            setBgImage(images[0])
            // cbInitImage(images[0])
        }
        // cbUpdateHomeImages(images)
    }, [images])

    // callback function to update the image list of thumbnail
    const cbUpdateImages = newImages => setImages(newImages)

    // callback function to update the index
    // const cbIndex = id => setIndex(id)

    // callback function to update the background image
    const cbUpdateMainBG = image => setBgImage(image)

    const cbFirstImages = images => setFirstImages(images)

    const cbFirstImage = image => setFirstImage(image)

    // callback function to enable redirect 'Picture 'page
    // const cbUpdateRedirect = () => setRedirect(true)

    useEffect(()=> {
        if (state) {
            setPrevImages(state.images)
            setPrevImage(state.image)
        }
        console.log('prev', prevImage)
    },[prevImage])

    return (
        <div className="Home"
            // style={{background: bgImage && bgImage.regular && `url('${bgImage.regular}') no-repeat center center/cover fixed`}}
        >
            <div className='searchBar'>
                <CityInput
                    cbUpdateImages={cbUpdateImages}
                    cbFirstImages={cbFirstImages}
                    cbFirstImage={cbFirstImage}
                    prevImages={prevImages}
                />
            </div>
            <ImageList
                images={images}
                cbUpdateMainBG={cbUpdateMainBG}
                firstImages={firstImages}
                prevImages={prevImages}
                // cbIndex={cbIndex}
                // cbUpdateRedirect={cbUpdateRedirect}
            />
        </div>
    )

}