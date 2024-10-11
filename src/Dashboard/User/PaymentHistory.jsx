import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function PaymentHistory() {
  const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const {data : payments = []}= useQuery({
        queryKey:['payments', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        },
        enabled: !! user?.email
    })
  return (
    <div>
      <div>
        <div className="bg-white p-3 md:p-8">
          <div className="pb-3">
            <h1 className="md:text-2xl text-sm font-semibold">
              TOTAL ORDERS : {payments.length}
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="grid md:grid-cols-12 bg-[#FFF3E3] text-black border-none px-8 py-2">
              <h1 className="md:col-span-1 ">No</h1>
              <h1 className="md:col-span-2">Email</h1>
              <h1 className="md:col-span-2">Price</h1>
              <h1 className="md:col-span-4">Transaction</h1>
              <h1 className="md:col-span-1">Action</h1>
              <h1 className="md:col-span-2">Date</h1>
            </div>
            {payments.map((payment, index) => (
              <div className="px-8 border border-b-gray-200">
                {/* row 1 */}
                <p className="grid md:grid-cols-12">
                  <p className="  col-span-1 py-3 mt-[8px] ">{index + 1}</p>
                  <p className="md:col-span-2 col-span-1  py-3">
                    {payment.email}
                  </p>
                  <p className="md:col-span-2 col-span-1  py-3 pl-4 mt-[8px]">
                    ${payment.price}
                  </p>
                  <p className="md:col-span-4 col-span-1  py-3 mt-[8px]">
                    {payment.transactionId}
                  </p>
                  <p className="md:col-span-1  py-3 mt-[8px] ">
                    {payment.status}
                  </p>
                  <p className="md:col-span-2  py-3 mt-[8px] ">
                    {payment.date}
                  </p>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden block -mt-2">
          <div className="">
            <div>
              <div className=" bg-orange-400 text-white border-none px-8 py-2 text-center">
                <h1 className="">ITEMES</h1>
              </div>
              {payments.map((payment, index) => (
                <div className=" p-2 border border-b-gray-200">
                  {/* row 1 */}
                  <p className="">
                    <p className="bg-green-400 py-1 text-center text-white">
                      {index + 1}
                    </p>
                    <div className="">
                      <p className="col-span-1">{payment.email}</p>
                      <div className="">
                        <p className="  ">
                          <span className="font-semibold">Name :</span> $
                          {payment.price}
                        </p>
                        <p className="">
                          <span className="font-semibold">Category :</span>{" "}
                          {payment.transactionId}
                        </p>
                        <p className="    ">
                          <span className="font-semibold">Price :</span>{" "}
                          {payment.status}
                        </p>
                        <p className="    ">
                          <span className="font-semibold">Price :</span>{" "}
                          {payment.date}
                        </p>
                      </div>
                    </div>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
