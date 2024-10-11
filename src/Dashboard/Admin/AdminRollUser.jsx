
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query';

export default function AdminRollUser() {

  const axiosSecure = UseAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleAdminuser = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeletuser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };


  return (
    <div><div>
    <div className="bg-white md:m-11 p-3 md:p-8">
    <div className="pb-3 md:py-11 ">
          <h1 className="md:text-2xl text-sm font-semibold">
            TOTAL USERS : {users.length}
          </h1>
        </div>

    <div className="">
          <div className="grid md:grid-cols-12 grid-cols-7 bg-[#B88E2F] text-white border-none md:px-8 px-2 py-2">
            <h1 className="md:col-span-1 ">No</h1>
            <h1 className="md:col-span-9 col-span-4">Email</h1>
            
            <h1 className="md:col-span-1">Roll</h1>
            <h1 className="md:col-span-1">Delet</h1>
            
          </div>
          {users.map((user, index) => (
            <div className="md:px-8 px-2 border border-b-gray-200" >
              {/* row 1 */}
              <p className="grid md:grid-cols-12 grid-cols-7">
                <p className="md:col-span-1 col-span-1 py-3 mt-[8px]">
                  {index + 1}
                </p>
                
                <p className="md:col-span-9 c col-span-4 py-3  mt-[8px]">
                  {user.email}
                </p>
                <button>
                {
                  user.role === "admin" ? ("admin") : (<h1
                    onClick={() => handleAdminuser(user)}
                    className="mt-[19px] py-3 md:col-span-1 text-end bg-red-800 rounded-md h-[30px] w-[30px] text-white text-lg"
                  >
                    <p>
                      <FaRegEdit className="ml-[5px] -mt-[6px]" />
                    </p>
                  </h1>) }
                </button>

                

                <button
                  className="mt-[19px]  bg-red-800 rounded-md h-[30px]  md:col-span-1 py-3 w-[30px] text-end text-white text-lg"
                  onClick={() => handleDeletuser(user)}
                >
                  <p>
                    <RiDeleteBin5Line className=" ml-[5px] -mt-[6px]" />
                  </p>
                </button>
              </p>
            </div>
          ))}
        </div>

    </div>

    


  </div></div>
  )
}
