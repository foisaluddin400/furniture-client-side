import { useEffect, useState } from "react";
import UseAxiosPublic from "./UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const UseProduct = () => {

    
    
    const axiosPublic = UseAxiosPublic();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching menu:", err); // Error handling
        }
    });

    // Returning menu data, loading state, refetch function, and error
    return [products, isLoading, refetch];

    

    
    
};

export default UseProduct;