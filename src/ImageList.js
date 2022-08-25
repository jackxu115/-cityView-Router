import './ImageList.scss'
import {Link} from "react-router-dom";
import {useState} from "react";

export const ImageList = ({images, cbUpdateMainBG, firstImages, prevImages}) => {

    const getBgImage = (current, first, prev) => {
        if (current !== first ) {
            return current
        } else {
            if (prev.length > 0) {
                return prevImages
            } else {
                return first
            }
        }
    }

    let imageList = getBgImage(images, firstImages, prevImages)

    return (
        <div className='carousel'>
            {
                imageList && imageList.map((image, index) =>
                        // <button>
                        <Link
                            key={index}
                            to={`/picture/${index}`}
                            state={{
                                image: image,
                                images: imageList
                            }}
                        >
                            <div
                                // add event listener and callback function to update background image
                                onClick={() => {
                                    cbUpdateMainBG(image);
                                    // cbIndex(index);
                                    // cbUpdateRedirect()
                                }}
                                style={{background: `url(${image.thumb}) no-repeat center center/cover fixed`}}>
                            </div>
                        </Link>
                    // </button>
                )
            }
        </div>
    )

}