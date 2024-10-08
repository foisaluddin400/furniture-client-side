import { Rating } from "@mui/material";




const Product = ({product}) => {
    const {id , title, img, rating, price,category} = product
    return (
        <div className="m-4">
            <div>
                <img className="w-full h-[300px]" src={img} alt="" />
                <div className="bg-slate-100 p-2">
                <h1 className="py-2 text-xl font-semibold ">{title}</h1>


<Rating size="small" name="read-only" value={rating} 
            readOnly />
            
            
            <h1 className="font-semibold text-xl">{price}</h1>
            
                </div>

            </div>
            
        </div>
    );
};

export default Product;