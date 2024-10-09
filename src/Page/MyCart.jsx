import { Link } from "react-router-dom";
import UseCart from "../UseHook/UseCart";
import { MdDelete } from "react-icons/md";
import UseAxiosSecure from "../UseHook/UseAxiosSecure";
import Swal from "sweetalert2";
const MyCart = () => {
  const [cart, refetch] = UseCart();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  const axiosSecure = UseAxiosSecure()
  const handleDelet=(id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                })
        }
    });
    
  }
  return (
    <div >
        
        <div className="md:shadow-lg md:p-4  md:px-11 py-11 md:mt-2">
      <div className="grid md:grid-cols-7 ">
        <div className="md:col-span-5 md:mr-6">
            
          {cart.map((item) => {
            return (
              <div>
                <div
                  key={item._id}
                  className="bg-[#FFF3E3] rounded-md p-2 m-2 md:flex md:justify-between items-center h-[120px]"
                >
                  <div className="flex md:items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="w-[80px] h-[90px] rounded-md"
                        src={item.img}
                        alt={item.name}
                      />
                    </div>
                    <div className="pl-3">
                      <h1 className="md:text-xl font-semibold">{item.title}</h1>
                      <h1 className=" pt-2">
                        Price:{" "}
                        <span className="text-[#B88E2F] ">${item.price}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="flex gap-7 -mt-6 md:mt-0 justify-end">
                  <select
                  value={item.color}
                        className="bg-white w-[70px]  rounded-md outline-none border " 
                    >
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                    </select>
                    <div> 
                    <input className="bg-white text-center w-10 border border-slate-300" type="text" value={item.quantity || 1} readOnly />
                    </div>
                    <button onClick={()=>handleDelet(item._id) } className=" text-3xl text-[#B88E2F]">
                    <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:col-span-2">
          <div className=" p-3 border rounded-lg mt-2 pt-5 m-2">
            <h1 className="text-xl font-semibold ">Order Summery</h1>
            <p className="pt-2 flex justify-between">
              Subtotal : <span>{totalPrice}</span>
            </p>
            
            <p className="pt-3 flex justify-between font-semibold text-xl">
              Total: <span className="text-[#B88E2F]">{totalPrice}</span>
            </p>
            <Link>
              <button className="bg-[#B88E2F] mt-4 w-full text-white h-[40px] rounded-lg">
                Process to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyCart;
