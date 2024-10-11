import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseCart from "../UseHook/UseCart";
import { MdDelete } from "react-icons/md";
import UseAxiosSecure from "../UseHook/UseAxiosSecure";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = UseCart();
  const [cartWithColors, setCartWithColors] = useState([]);
  const axiosSecure = UseAxiosSecure();

  // Load colors from localStorage when component mounts
  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("selectedColors")) || [];
    const updatedCart = cart.map((item) => {
      const savedItem = savedColors.find((saved) => saved.productId === item.productId);
      return savedItem ? { ...item, selectedColor: savedItem.selectedColor } : { ...item, selectedColor: 'red' };
    });
    setCartWithColors(updatedCart);
  }, [cart]);

  // Save selected color to localStorage
  const handleColorChange = (itemId, color) => {
    const updatedCart = cartWithColors.map((item) =>
      item._id === itemId ? { ...item, selectedColor: color } : item
    );
    setCartWithColors(updatedCart);
    localStorage.setItem("selectedColors", JSON.stringify(updatedCart));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="md:shadow-lg md:p-4 md:px-11 py-11 md:mt-2">
        <div className="grid md:grid-cols-7 ">
          <div className="md:col-span-5 md:mr-6">
            {cartWithColors.map((item) => (
              <div key={item._id} className="bg-[#FFF3E3] rounded-md p-2 m-2 md:flex md:justify-between items-center h-[120px]">
                <div className="flex md:items-center justify-between">
                  <div className="flex items-center">
                    <img className="w-[80px] h-[90px] rounded-md" src={item.img} alt={item.title} />
                  </div>
                  <div className="pl-3">
                    <h1 className="md:text-xl font-semibold">{item.title}</h1>
                    <h1 className="pt-2">
                      Price: <span className="text-[#B88E2F] ">${item.price}</span>
                    </h1>
                  </div>
                </div>
                <div className="flex gap-7 -mt-6 md:mt-0 justify-end">
                  <select
                    value={item.selectedColor}
                    className="bg-white w-[70px] rounded-md outline-none border"
                    onChange={(e) => handleColorChange(item._id, e.target.value)}
                  >
                    <option value="red">Red</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                  </select>
                  <input className="bg-white text-center w-10 border border-slate-300" type="text" value={item.quantity || 1} readOnly />
                  <button onClick={() => handleDelete(item._id)} className="text-3xl text-[#B88E2F]">
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <div className="p-3 border rounded-lg mt-2 pt-5 m-2">
              <h1 className="text-xl font-semibold ">Order Summary</h1>
              <p className="pt-2 flex justify-between">
                Subtotal : <span>${cart.reduce((total, item) => total + item.price, 0)}</span>
              </p>
              <p className="pt-3 flex justify-between font-semibold text-xl">
                Total: <span className="text-[#B88E2F]">${cart.reduce((total, item) => total + item.price, 0)}</span>
              </p>
              {cart.length ? (
                <Link to="/payment">
                  <button className="bg-[#B88E2F] mt-4 w-full text-white h-[40px] rounded-lg">
                    Proceed to Checkout
                  </button>
                </Link>
              ) : (
                <button disabled className="bg-[#B88E2F] mt-4 w-full text-white h-[40px] rounded-lg">
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
