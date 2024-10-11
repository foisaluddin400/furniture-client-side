import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Rating } from "@mui/material";
import UseProduct from "../UseHook/UseProduct";
import Product from "../Components/home/Product";
import UseAxiosSecure from "../UseHook/UseAxiosSecure";
import UseCart from "../UseHook/UseCart";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('red'); 
  const product = useLoaderData();
  const { title, img, description, rating, color, price, category, _id} = product;

  const [products] = UseProduct()
  const relatedProducts = products.filter(product=> product.category === category)


  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [, refetch] = UseCart()

  const handleAddcart = () => {
    if (user && user.email) {
      const cartItem = {
        productId: _id,
        email: user.email,
        title,
        img,
        price,
        color: selectedColor, 
        quantity,
        category
         
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
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
      });
    } else {
      navigate('/login');
    }
  };

  const incrementQuantity = () => {
    if (quantity < 8) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  

  return (
    <div>
      <div className="flex bg-[#FFF3E3] p-5">
        <Link className="flex text-slate-400 mr-4">
          Home{" "}
          <MdOutlineArrowForwardIos className="ml-2 mt-[6px] text-[14px]" />
        </Link>
        <Link className="flex text-slate-400">
          Shop{" "}
          <MdOutlineArrowForwardIos className="ml-2 mt-[6px] text-[14px] mr-3" />
          |
        </Link>
        <span className="ml-4">{title}</span>
      </div>
      <div className="grid md:grid-cols-2 my-11">
        <div className="flex justify-center">
          <img className="w-[500px]" src={img} alt="" />
        </div>
        <div className="m-4">
          <h1 className="text-2xl">{title}</h1>
          <h1 className="text-slate-500 font-semibold text-xl py-1">
            {" "}
            {price}{" "}
          </h1>
          <div className="py-1">
            <Rating size="small" name="read-only" value={rating} readOnly />
          </div>
          <p>{description}</p>
          <p className="text-slate-500 mt-4">Color</p>
          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio
                  
                   bg-red-500 checked:bg-red-500"
                   checked={selectedColor === 'red'}
                   onChange={() => setSelectedColor('red')}
                  defaultChecked
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio bg-black checked:bg-black"
                  checked={selectedColor === 'black'}
                  onChange={() => setSelectedColor('black')}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio bg-white checked:bg-white"
                  checked={selectedColor === 'white'}
                  onChange={() => setSelectedColor('white')}
                />
              </label>
            </div>
          </div>
          <div className="flex mt-5">
            <div>
              <div className="flex border w-[80px] justify-between px-1 p-1 rounded-sm ">
                <button onClick={decrementQuantity}>-</button>
                <input className="bg-white w-[40px] border-none text-center" type="text" value={quantity} readOnly />
                <button onClick={incrementQuantity}>+</button>
              </div>
            </div>
            <div className="mb-8 ml-3">
              <button onClick={()=> handleAddcart(product)} className="bg-[#B88E2F] p-[5px] px-4 text-white rounded-sm ">
                Add To Cart
              </button>
            </div>
          </div>{""}
          <hr />
          <div className="mt-8 text-slate-500">
            <p>
              SKU <span className="ml-11">: SS001</span>
            </p>
            <p>
              Category <span className="ml-3">: {category}</span>
            </p>
            <p>
              Tags <span className="ml-11">: Sofa, Chair, Home, Shop</span>
            </p>
          </div>
        </div>
      </div> <hr />
     <div className="flex justify-center mt-8">
     <div className="lg:px-[100px] p-5">
        <div role="tablist" className="tabs grid grid-cols-3">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Description"
          />
          <div role="tabpanel" className="tab-content py-11 text-slate-500">
            <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>

            <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque saepe nesciunt illum rerum suscipit sit reiciendis veniam consequuntur enim eaque! Sit sapiente dolor porro enim et vel impedit unde, voluptatibus fugit accusantium voluptas? Optio quis, modi, iusto accusantium consequatur id nihil perferendis incidunt consectetur repudiandae minus. Et harum voluptatem quibusdam sequi incidunt, dolor quasi rerum velit a quia quos nostrum, omnis veritatis libero exercitationem ducimus ratione. Repellat earum beatae magni quisquam reiciendis! Neque quisquam cumque possimus explicabo sequi sapiente ad voluptatem sint minima vel, inventore similique dicta nulla deleniti laboriosam ut, esse totam? Reprehenderit voluptates libero dicta perspiciatis obcaecati blanditiis?
            </p>

          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab "
            aria-label="Additional Information"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content py-11  text-slate-500">
            adipisicing elit. Dolores est hic odio voluptas fuga! Natus, esse minima suscipit consectetur atque dolorum unde magni nam hic tempore adipisci repellendus earum pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum culpa fugiat vitae perferendis commodi laborum ullam illo alias exercitationem, a consequuntur accusamus repudiandae nulla sequi praesentium voluptates error sapiente neque facilis. Consequuntur animi architecto numquam cupiditate voluptates dolor quidem corporis, aliquid nesciunt dicta facilis, quisquam quae nemo unde ullam. Id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem amet nisi ratione atque nostrum, harum magnam qui fugit voluptatibus velit deleniti totam similique doloribus. Nisi doloribus itaque veritatis enim provident tempora blanditiis perferendis autem, ea dolores ullam corrupti possimus, labore delectus assumenda similique consequuntur eum iste maxime quos illo, quaerat alias. Maxime eligendi, nisi ipsum eaque ea doloremque sapiente neque quisquam beatae eius possimus perspiciatis, reiciendis placeat culpa totam ullam hic saepe expedita voluptatem, iste doloribus ipsam! Alias tenetur beatae quasi adipisci esse delectus vero, praesentium quam architecto quos et facilis impedit dolorem! Molestias exercitationem tempora aliquam ut voluptate voluptatibus.
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label={`Reviews ${rating}`}
          />
          <div role="tabpanel" className="tab-content py-11  text-slate-500">
            voluptas error rerum animi excepturi eveniet modi, officiis at consequuntur enim nobis ipsam tempora est voluptatum consectetur eligendi quo repellat ipsum dolores eos iusto suscipit vel beatae ab! Corrupti autem officiis, fugit odio quasi facilis eligendi sed deserunt eius eum quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nobis quo ea voluptatibus fuga voluptates quam officiis nam at delectus in, temporibus amet voluptatum, quasi explicabo adipisci enim dolore itaque. Quod veniam eveniet, ipsa quae vero provident tenetur rerum perspiciatis quam. Eos iusto officiis voluptatibus earum harum nobis sit eligendi? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque eveniet quaerat provident nam, sapiente earum veniam fugit quisquam autem odio magni praesentium nulla error perspiciatis sunt, sed similique ratione molestias rerum. Aut, corporis sint ipsam ratione consequuntur ipsa, provident eligendi recusandae laborum maiores eum dignissimos id maxime officia impedit doloremque. Accusantium earum quas asperiores soluta, aspernatur voluptatum at veniam unde eaque, tempora doloremque amet nihil, rerum dicta quisquam. Dolorum iure necessitatibus eos laboriosam dolore cumque beatae repellendus sequi saepe qui cupiditate quae, culpa deserunt. Adipisci optio dolores rem, fugit ipsum doloremque. Error eum laborum dolor magnam explicabo libero aliquam odio.
          </div>
        </div>
      </div>
     </div>
     <div className="text-center mt-[70px]">
        <h1 className="text-3xl text-center font-semibold">Releted Products</h1>
        <p className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
     <div className="grid lg:grid-cols-4 md:grid-cols-2 m-4">
        {
            relatedProducts.map((relatedProduct)=> <Product product={relatedProduct}></Product>)
        }
        
     </div>
     <div className="text-center mb-5 mt-5">
      <Link to={'/shop'}><button className="border border-[#B88E2F] py-2 px-5">Show More</button></Link>
      </div>
    </div>
  );
};

export default ProductDetails;
