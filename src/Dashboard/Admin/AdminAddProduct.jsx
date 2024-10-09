import React from 'react'
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../UseHook/UseAxiosPublic';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMGBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AdminAddProduct() {

    const { register, handleSubmit } = useForm();

    const axiosPublic= UseAxiosPublic()
    const axiosSecure= UseAxiosSecure()

    const onSubmit = async (data) => {
        console.log(data);
        //image upload to imgbb
        const imgFile = { image: data.img[0] };
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        if (res.data.success) {
          const menuItem = {
            title: data.title,
            price: parseFloat(data.price),
            category: data.category, 
            color: data.color, 
            description: data.description,
            img: res.data.data.display_url,
          };
          await axiosSecure.post("/menu", menuItem).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
    
            }
            console.log(res.data);
          });
        }
      };
    
  return (
    <div>
      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#F3F3F3] py-20 px-10 space-y-5 "
        >
          <div>
            {" "}
            <label htmlFor="name">Product Title</label>
            <input
              className=" bg-white w-full p-2 rounded-md outline-none border "
              {...register("title")}
              placeholder="Enter Your Phonr number"
            />
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-10">
            <div>
              {" "}
              <label htmlFor="Price">Price</label> <br />
              <input
                className="bg-white w-full p-2 rounded-md outline-none border "
                {...register("price")}
              />
            </div>
            <div>
              <label htmlFor="title">Title*</label> <br />
              <select
                className="bg-white w-full p-2 rounded-md outline-none border "
                
                {...register("category")}
              >
                <option value="sofa">Sofa</option>
                <option value="drawing">Drawing</option>
                <option value="table">Table</option>
                <option value="chair">Chair</option>
                <option value="bed">Bed</option>
              </select>
            </div>
            <div className="mt-5 lg:mt-0">
                    <label htmlFor="Name">Color</label>
                    <select
                        className="bg-white w-full p-2 rounded-md outline-none border "
                       
                        {...register("color")}
                    >
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                    </select>
                </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>

            <textarea
              className="outline-none p-2 rounded-md w-[100%] h-[100px] bg-white"
              {...register("description")}
              placeholder="Product Description"
            ></textarea>
            <input
              type="file"
              className="file-input w-full max-w-xs mt-5"
              {...register("img")}
            />

            <div className=" mt-8">
              <input
                className="bg-orange-700 text-white btn"
                type="submit"
                value="Add Items"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
