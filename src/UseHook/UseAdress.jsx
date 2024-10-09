import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const UseAdress = () => {
    const axiosSecure = UseAxiosSecure()

    const {user} = useContext(AuthContext)

    const {refetch, data:  adress =[]} = useQuery({
        queryKey : ['adress',user?.email],
        queryFn : async()=>{
            const res = await axiosSecure.get(`/adress?email=${user.email}`)
            return res.data;
        }
    })

    return [adress , refetch]
};

export default UseAdress;