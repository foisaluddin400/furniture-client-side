import { Rating } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure";
import UseCart from "../../UseHook/UseCart";
import Swal from "sweetalert2";

const Product = ({ product }) => {
  const {_id, title, img, rating, price,color } = product;
  const [isHovered, setIsHovered] = useState(false);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [, refetch] = UseCart()

  const handleAddcart =(product)=>{
    console.log(product)
    if(user && user.email){
      const cartItem = {
        productId : _id,
        email: user.email,
        title,
        img,
        price,
        color,
      };
      axiosSecure.post("/carts", cartItem)
      .then(res=>{
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${title} Added`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
      }
      })

    }else{
      navigate('/login')
    }
  }

  return (
    <div
      className="m-4 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        className={`w-full h-[300px] transition duration-500 ${isHovered ? 'grayscale opacity-40' : 'opacity-100'}`}
        src={img} 
        alt={title} 
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500"></div>
      )}
      <div className="bg-slate-100 p-2 relative">
        <h1 className="py-2 text-xl font-semibold">{title}</h1>
        <Rating size="small" name="read-only" value={rating} readOnly />
        <h1 className="font-semibold text-xl">{price}</h1>
      </div>

      <button onClick={()=> handleAddcart(product)}
        className={`bg-red-600 text-white p-2 absolute top-1/2 left-0 transform -translate-y-1/2 
        ${isHovered ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500`}
      >
        Add to Cart
      </button>

      <Link to={`/product/${_id}`}><button
        className={`bg-black text-white p-2 absolute top-1/2 right-0 transform -translate-y-1/2 
        ${isHovered ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}
      >
        Show Details
      </button></Link>
    </div>
  );
};

export default Product;
