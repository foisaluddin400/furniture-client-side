import UseProduct from "../../UseHook/UseProduct";
import Product from "./Product";



import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';

const TrendingProduct = () => {




    
    const [products] = UseProduct()

    const popularProducts = products.filter(item=> item.popular === true);



    return (
        <div >
            <div className="text-center mt-[70px]">
        <h1 className="text-3xl text-center font-semibold">Populer Product</h1>
        <p className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>



<Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
                popularProducts.map((product)=><SwiperSlide>


                    <Product product={product}></Product>


                </SwiperSlide> )
            }
       
       
    
      </Swiper>
            
            
        </div>
    );
};

export default TrendingProduct;