import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './Splash.css'

const Splash = () => {

    const featuredProducts = useRef([])
    const [loaded, setLoaded] = useState(false)
    const fetchedProducts = useSelector(state => state.products)

    
    useEffect(()=>{
        if (!loaded && Object.values(fetchedProducts)[9]) {
            featuredProducts.current =  Object.values(fetchedProducts).shuffle().slice(0,10);
            setLoaded(true)
        }
    },[fetchedProducts])


    return (
        <>
        <h1>Darts Check-In</h1>
        <div id="splash-middle">
            
        </div>
        </>
    )
}

export default Splash;