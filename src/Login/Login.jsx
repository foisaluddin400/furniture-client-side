import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { register, handleSubmit } = useForm()
    const {SignInUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
  const onSubmit = (data) => {
    SignInUser(data.email,data.password)
    .then(result=> {
        console.log(result.user)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        navigate(from, {replace:true})
    })
    .then(error=>{
        console.error(error)
    })

  }
  
  return (
    <div>
        <div className="shopBack">
        <div className="text-center text-4xl py-[110px]">Login</div>
      </div>
      <div className="shadow-lg lg:w-[30%] md:w-[60%] my-11 m-auto p-3">
      <h1 className='mt-3 text-3xl font-semibold mb-4'>Login NOw</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input  {...register("email")} className="w-full p-3 border border-stone-400 bg-white rounded-md"  placeholder="Your Email"/>
          <input  {...register("password")} className="w-full border border-stone-400 bg-white rounded-md p-3 my-3" placeholder="Your Password"/>
          <input className="bg-[#B88E2F] px-5 py-2 w-full rounded-md text-white " type="submit" value="Login" />
        </form>
        <p className="mt-3"><Link className='text-[#B88E2F]' to='/register'>Register</Link> Account?</p>

        
      </div>
    </div>
  );
};
export default Login;
