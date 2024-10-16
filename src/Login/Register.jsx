
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../UseHook/UseAxiosPublic';


const Register = () => {
    const { register, handleSubmit } = useForm()
    const {createUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = UseAxiosPublic()
  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email,data.password)
    .then(result=> {
        console.log(result.user)
        const userInfo = {
          email:data.email,
          name: data.name
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          if (res.data.insertedId) {
            console.log('user added sucessfull');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
        })
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/')
    })
    .then(error=>{
        console.error(error)
    })
}


    return (
        <div>
        <div className="shopBack">
        <div className="text-center text-4xl py-[110px]">Register</div>
      </div>
      <div className="shadow-lg lg:w-[30%] md:w-[60%] my-11 m-auto p-3">
        <h1 className='mt-3 text-3xl font-semibold mb-4'>Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input {...register("name")} className="w-full p-3 border border-stone-400 bg-white rounded-md"  placeholder="Your Name"/>
          <input {...register("email")} className="w-full p-3 mt-3 border border-stone-400 bg-white rounded-md" placeholder="Your Email"/>
          <input {...register("password")} className="w-full border border-stone-400 bg-white rounded-md p-3 my-3" placeholder="Your Password"/>
          <input className="bg-[#B88E2F] px-5 py-2 w-full rounded-md text-white " type="submit" value="Login" />
        </form>
        <p className="mt-3"><Link className='text-[#B88E2F]' to='/login'>Login</Link> Now</p>
      </div>
    </div>
    );
};

export default Register;