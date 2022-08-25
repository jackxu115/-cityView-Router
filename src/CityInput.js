import {useEffect, useState} from "react";
import {AccessKey, BasicUrl, DefaultCity} from "./consts";
import axios from "axios";
import './CityInput.css'
import {useLocation} from "react-router-dom";

export const CityInput = ({cbUpdateImages, cbFirstImages, cbFirstImage, prevImages}) => {
    const [city, setCity] = useState(DefaultCity)
    const [firstImages, setFirstImages] = useState([])

    useEffect(() => {
        if(city === DefaultCity) {
            cbFirstImages(firstImages)
            if (firstImages.length > 0){
                cbFirstImage(firstImages[0])
            }
        }
    }, [firstImages])

    // console.log('history', useLocation().state.image.regular)

    // event handler for key down
    const cbInput = event => {
        let newCity = event.target.value.trim().toLowerCase()
        event.key === 'Enter' &&
        newCity !== city &&
        (() => {
            setCity(newCity) // async
            console.log('new city input: ', city, newCity)
            fetchCity(newCity)
        })()
    }

    // fetch the default city at initialization
    useEffect(() => {
        fetchCity(DefaultCity)
    }, [])

    // fetch city information
    const fetchCity = newCity =>
        // axios--3rd party library
        // https://www.npmjs.com/package/axios
        axios.get(BasicUrl, {
            params: {
                query: newCity,
                orientation: 'landscape',

            },
            headers: {
                Authorization: `Client-ID ${AccessKey}`
            }
        }).then(response => {
            // Destructure the response
            let {data: {results}} = response
            // reorganize the data structure, make one array like this:
            // [
            //     {des:'sunshine', regular: 'http..', thumb: 'http..'},
            //     {des:'sunshine', regular: 'http..', thumb: 'http..'},
            //     {...},
            //     ...
            // ]
            let imageList = results.map(item => ({
                des: item.alt_description,
                regular: item.urls.regular,
                thumb: item.urls.thumb,
                city: newCity
            }))

            // call back function to update the image list of thumbnail
            cbUpdateImages(imageList)
            setFirstImages(imageList)

        }).catch(error => console.log('fetch city http error!', error))

    const getCity = (prev) => {
        if (city !== DefaultCity ) {
            return city
        } else {
            if (prev.length > 0) {
                return prev[0].city
            } else {
                return DefaultCity
            }
        }
    }

    let printCity = getCity(prevImages)



    return <>
        <h2 className='cityName'>New City: {printCity}</h2>
        <input
            className='inputCity'
            type="text"
            placeholder="Search City here..."
            // add event listener
            onKeyDown={cbInput}
        />
    </>
}
