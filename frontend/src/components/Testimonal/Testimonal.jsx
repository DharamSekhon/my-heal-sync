import React from "react";
// import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import PatientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testimonal = () => {
  return (
    // <div className="mt-[30px] lg:mt-[55px]">
    //   <Swiper
    //     // modules={[Pagination]}
    //     spaceBetween={30}
    //     slidesPerView={1}
    //     pagination={{ clickable: true }}
    //     breakpoints={{
    //       640: {
    //         slidesPerView: 1,
    //         spaceBetween: 0,
    //       },
    //       768: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //       },
    //       1024: {
    //         slidesPerView: 3,
    //         spaceBetween: 30,
    //       },
    //     }}
    //   >
    //     <SwiperSlide>
    //       <div className="py-[30px] px-5 rounded-3">
    //         <div className="flex items-center gap-[13px]">
    //           <img src={PatientAvatar} alt="" />
    //           <div>
    //             <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
    //               Muhibir Rahman
    //             </h4>
    //             <div className="flex items-center gap-[2px]">
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //             </div>
    //           </div>
    //         </div>

    //         <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
    //           "I have taken medical services from them. They treat so well and
    //           they are providing the best medical services."
    //         </p>
    //       </div>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <div className="py-[30px] px-5 rounded-3">
    //         <div className="flex items-center gap-[13px]">
    //           <img src={PatientAvatar} alt="" />
    //           <div>
    //             <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
    //               Muhibir Rahman
    //             </h4>
    //             <div className="flex items-center gap-[2px]">
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //             </div>
    //           </div>
    //         </div>

    //         <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
    //           "I have taken medical services from them. They treat so well and
    //           they are providing the best medical services."
    //         </p>
    //       </div>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <div className="py-[30px] px-5 rounded-3">
    //         <div className="flex items-center gap-[13px]">
    //           <img src={PatientAvatar} alt="" />
    //           <div>
    //             <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
    //               Muhibir Rahman
    //             </h4>
    //             <div className="flex items-center gap-[2px]">
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //             </div>
    //           </div>
    //         </div>

    //         <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
    //           "I have taken medical services from them. They treat so well and
    //           they are providing the best medical services."
    //         </p>
    //       </div>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <div className="py-[30px] px-5 rounded-3">
    //         <div className="flex items-center gap-[13px]">
    //           <img src={PatientAvatar} alt="" />
    //           <div>
    //             <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
    //               Muhibir Rahman
    //             </h4>
    //             <div className="flex items-center gap-[2px]">
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //               <HiStar className="text-yellowColor w-[18px] h-5" />
    //             </div>
    //           </div>
    //         </div>

    //         <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
    //           "I have taken medical services from them. They treat so well and
    //           they are providing the best medical services."
    //         </p>
    //       </div>
    //     </SwiperSlide>

    //   </Swiper>
    // </div>

    <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm  md:mb-12 md:grid-cols-2 bg-white ">
      <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e ">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <p class="my-4">
            I have taken medical services from them. They treat so well and they
            are providing the best medical services.
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
          <img
            class="rounded-full w-9 h-9"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Bonnie Green</div>
            <div className="flex items-center gap-[2px]">
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
            </div>
          </div>
        </figcaption>
      </figure>

      <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e ">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <p class="my-4">
            I have taken medical services from them. They treat so well and they
            are providing the best medical services.
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
          <img
            class="rounded-full w-9 h-9"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Roberta Casas</div>
            <div className="flex items-center gap-[2px]">
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
            </div>
          </div>
        </figcaption>
      </figure>

      <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e ">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <p class="my-4">
            I have taken medical services from them. They treat so well and they
            are providing the best medical services.
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
          <img
            class="rounded-full w-9 h-9"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Jese Leos</div>
            <div className="flex items-center gap-[2px]">
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
            </div>
          </div>
        </figcaption>
      </figure>

      <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e ">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
          <p class="my-4">
            I have taken medical services from them. They treat so well and they
            are providing the best medical services.
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
          <img
            class="rounded-full w-9 h-9"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
            <div>Joseph McFall</div>
            <div className="flex items-center gap-[2px]">
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
              <HiStar className="text-yellowColor w-[18px] h-5" />
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default Testimonal;
