
import Product from "./Product";
import UseProduct from "../../UseHook/UseProduct";
import { Link } from "react-router-dom";

const OurProduct = () => {

    const [products] = UseProduct()


  return (
    <div>
      <div className="text-center mt-[70px]">
        <h1 className="text-3xl text-center font-semibold">Browse The Range</h1>
        <p className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="grid md:grid-cols-4">
        {
            products.slice(7).map((product)=> <Product product={product}></Product>)
        }
      </div>

      <div className="text-center mb-5 mt-5">
      <Link to={'/shop'}><button className="border border-[#B88E2F] py-2 px-5">Show More</button></Link>
      </div>
    </div>
  );
};

export default OurProduct;
