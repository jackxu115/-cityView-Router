import {Link, useLocation, useNavigate} from "react-router-dom";
import './Picture.scss'
import {useEffect, useState} from "react";

export const Picture = () => {
    const {state} = useLocation()
    const [prevImage, setPrevImage] = useState()
    const [prevImages, setPrevImages] = useState()

    useEffect(() => {
        if (state) {
            setPrevImage(state.image)
            setPrevImages(state.images)
        }
    }, [])

    // console.log('history', useLocation().state.image.regular)
    // console.log('history2', useLocation().state.images)

    // use a function based on navigate to route
    // let navigate = useNavigate()
    // const jumpTo = (path) => {
    //     /*can include more logic actions in history.push*/
    //     navigate(path, {replace: true}) // replace true or false to replace the page in history
    // }

    return (
        <div className="Picture"
             style={{background: `url(${useLocation().state.image.regular}) no-repeat center center/cover fixed`}}
        >
            <h2>{useLocation().state.image.des}</h2>
            {/*<button onClick={() => {jumpTo("/home");}}>Home</button>*/}
            {/*<Link to="/home">Home</Link>*/}
            {/*<button type="button" onClick={() => window.history.go(-1)}>Home</button>*/}
            <button>
                <Link
                    className="Home_Button"
                    to={'/home'}
                    state={{
                        image: prevImage,
                        images: prevImages
                    }}
                >
                    Home
                </Link>
            </button>
        </div>
    )
}