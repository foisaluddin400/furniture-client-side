import { useEffect, useState } from "react";


const UseProduct = () => {

    const [products, setProducts] = useState([])

    useEffect(()=>{  
        fetch('menu.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    
    return [products];
};

export default UseProduct;