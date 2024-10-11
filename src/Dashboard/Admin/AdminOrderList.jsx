import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AdminOrderList() {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  return (
    <div className="text-lg">
      <div >
        <div className="text-2xl mt-4 "><span>Total Order : </span>{payments.length}</div>
        {payments.map((payment) => (
          <div key={payment._id} className="border m-6 p-5 grid md:grid-cols-2">
            <div className="m-3">
              <div className="bg-[#B88E2F] p-2 text-white rounded-md text-center text-xl">
                Product Information
              </div>
              <p>
                <span className="font-semibold">Email:</span> {payment.email}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {payment.price}
              </p>
              <p>
                <span className="font-semibold">Transaction ID:</span>{" "}
                {payment.transactionId}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(payment.date).toLocaleString()}
              </p>
              <div>
                <h2 className="flex">
                  <span className="font-semibold">Categories : </span>
                  {Array.isArray(payment.category) ? (
                    <ul className="flex">
                      {payment.category.map((cat, index) => (
                        <li key={index}>{cat} ,</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{payment.category}</p>
                  )}
                </h2>
              </div>
              <div>
                <h2>
                  <span className="font-semibold">Product Names:</span>
                  {Array.isArray(payment.productName) ? (
                    <ul>
                      {payment.productName.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{payment.productName}</p>
                  )}
                </h2>
              </div>
              <div>
                <h2>
                  <span className="font-semibold">Product Images:</span>
                  {Array.isArray(payment.productImg) ? (
                    <div className="md:flex gap-4 grid grid-cols-3">
                      {payment.productImg.map((imgUrl, index) => (
                        <img 
                          key={index}
                          src={imgUrl}
                          alt={`Product ${index}`}
                          className="w-24 h-24"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={payment.productImg}
                      alt="Product"
                      className="w-24 h-24"
                    />
                  )}
                </h2>
              </div>
              
            </div>
            <div  className="m-3"> 
            <div className="bg-[#B88E2F] p-2 text-center text-xl text-white rounded-md">
                Cusotemr Information
              </div>
              <div >
              <h1> <span className="font-semibold">Name : </span>{payment.name}</h1>
              <h1> <span className="font-semibold">User : </span>{payment.user}</h1>
              <h1> <span className="font-semibold">Adress : </span>{payment.adress}</h1>
              <h1> <span className="font-semibold">City : </span>{payment.city}</h1>
              <h1> <span className="font-semibold">Phone : </span>{payment.phone}</h1>
              <h1> <span className="font-semibold">Country : </span>{payment.country}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
