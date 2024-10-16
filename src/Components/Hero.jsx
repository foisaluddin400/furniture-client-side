import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="back">
        <div className="flex justify-end ">
          <div className="bg-[#FFF3E3] text-[#B88E2F] md:w-[700px] p-6 py-11 md:mt-[40vh] mt-[20vh] m-6 md:mr-[7vh]">
            <p className="text-black">New Arrival</p>
            <h1 className="font-bold md:text-6xl text-3xl">Discover Our <br /> New Collection</h1>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              amet esse sed asperiores delectus quam, quibusdam similique nulla?
              Voluptatibus, aliquid!
            </p>
            <Link to='/shop'><button className="bg-[#B88E2F] text-white px-7 py-3 mt-5">
              BUY NOW
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
