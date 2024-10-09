import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://furniture-website-server.vercel.app'
})

const UseAxiosSecure = () => {
    return axiosSecure
};

export default UseAxiosSecure;