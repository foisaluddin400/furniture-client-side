import dining from "../../assets/dining.png";
import living from "../../assets/living.png";
import bedroom from "../../assets/bedroom.png";
const Brows = () => {
  return (
    <div>
      <div className="text-center mt-[70px]">
        <h1 className="md:text-3xl text-xl text-center font-semibold">Browse The Range</h1>
        <p className="text-slate-400">
          Lorem ipsum dolor sit amet, 
        </p>
      </div>
      <div className="flex justify-center mt-9">
        <div className="md:flex gap-5 text-center">
          <div className="m-5 md:m-0">
            <img src={dining} alt="" />
            <h1 className="text-2xl py-3">Dining</h1>
          </div>
          <div className="m-5 md:m-0">
            <img src={living} alt="" />
            <h1 className="text-2xl py-3">Living</h1>
          </div>
          <div className="m-5 md:m-0">
            <img src={bedroom} alt="" />
            <h1 className="text-2xl py-3">Bedroom</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brows;
