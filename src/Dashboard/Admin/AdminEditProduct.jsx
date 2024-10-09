import Swal from "sweetalert2";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure";
import UseProduct from "../../UseHook/UseProduct"
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function AdminEditProduct() {
    const[products, isLoading, refetch] = UseProduct();
    const axiosSecure = UseAxiosSecure();
    const handleDeleteItem =(item)=>{
        Swal.fire({
            title: "Are You Sure",
            text: "আপনি এটি ফিরে পাবেন না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const res = await axiosSecure.delete(`/menu/${item._id}`);
              if (res.data.deletedCount > 0) {
                refetch(); 
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${item.title} Delet Successfull`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            }
          });
    }
  return (
    <div>
        <div>
        <div className="shadow-lg m-3 p-3 md:p-8">
          <div className="pb-3 md:py-11">
            <h1 className="md:text-2xl text-sm font-semibold">
              TOTAL ORDERS : {products.length}
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="grid md:grid-cols-12 bg-slate-200 text-black border-none px-8 py-2">
              <h1 className="md:col-span-1">No</h1>
              <h1 className="md:col-span-1">Image</h1>
              <h1 className="md:col-span-4"></h1>
              <h1 className="md:col-span-1">Category</h1>
              <h1 className="md:col-span-1">Color</h1>
              <h1 className="md:col-span-2">Price</h1>
              <h1 className="md:col-span-1 md:pl-5">Edit</h1>
              <h1 className="md:col-span-1 md:pl-5">Delete</h1>
            </div>
            {products.map((item, index) => (   
                <p className="grid md:grid-cols-12">
                  <p className="md:col-span-1 col-span-1 py-3 mt-[8px]">
                    {index + 1}
                  </p>
                  <p className="md:col-span-1 col-span-1 py-3">
                    <img className="md:w-[80px] w-[100px] h-[80px]" src={item.img} alt="" />
                  </p>
                  <p className="md:col-span-4 col-span-1 py-3 pl-4 mt-[8px]">
                    {item.title}
                  </p>
                  <p className="md:col-span-1 col-span-1 py-3 mt-[8px]">
                    {item.category}
                  </p>
                  <p className="md:col-span-1 col-span-1 py-3 mt-[8px]">
                    {item.color}
                  </p>
                  <p className="md:col-span-2 py-3 mt-[8px]">{item.price}</p>
                  <Link to={`/adminupdate/${item._id}`}
                    
                    className="mt-[19px] py-3 col-span-1 text-end bg-red-600 rounded-md h-[30px] w-[30px] text-white text-lg"
                  >
                    <p>
                      <FaRegEdit className="ml-[5px] -mt-[6px]" />
                    </p>
                  </Link>
                  <button
                    className="mt-[19px] bg-red-600 rounded-md h-[30px] col-span-1 py-3 w-[30px] text-end text-white text-lg"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <p>
                      <RiDeleteBin5Line className="ml-[5px] -mt-[6px]" />
                    </p>
                  </button>
                </p>
              
            ))}
          </div>
        </div>

        <div className="md:hidden block -mt-2">
          <div>
            <div className="bg-slate-300 text-white border-none px-8 py-2 text-center">
              <h1>ITEMS</h1>
            </div>
            {products.map((item, index) => (
                <p>
                  <p className="">{index + 1}</p>
                  <div className="grid grid-cols-3">
                    <p className="col-span-1">
                      <img className="" src={item.img} alt="" />
                    </p>
                    <div className="col-span-2 -mt-3 pl-3">
                      <p>
                        <span className="font-semibold">Name :</span>{" "}
                        {item.title}
                      </p>
                      <p>
                        <span className="font-semibold">Category :</span>{" "}
                        {item.category}
                      </p>
                      <p>
                        <span className="font-semibold">Color :</span>{" "}
                        {item.color}
                      </p>
                      <p>
                        <span className="font-semibold">Price :</span>{" "}
                        {item.price}
                      </p>
                      <button className="bg-red-600 rounded-md h-[25px] col-span-1 w-[25px] text-end text-white text-lg">
                        <Link to={`/adminupdate/${item._id}`}>
                          <FaRegEdit className="ml-[5px] -mt-[3px]" />
                        </Link>
                      </button>
                      <button
                        className="ml-1 bg-red-800 rounded-md h-[25px] col-span-1 w-[25px] text-end text-white text-lg"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <p>
                          <RiDeleteBin5Line className="ml-[3px] -mt-[3px]" />
                        </p>
                      </button>
                    </div>
                  </div>
                </p>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
