import React from "react";
import swachhtaPakhwara from './../../../assets/swachhtaPakhwara.jpg'



const HeroSection = () => {
  return (
    <section className=" text-white relative bg-cover bg-center bg-no-repeat flex justify-start py-50 xl:pb-52 px-10 xl:px-62 sm:py-10 sm:pb-51 items-center min-h-[50vh] h-screen" style={{backgroundImage: `url(${swachhtaPakhwara})`}}>
        <div className="absolute inset-0 bg-black/70"></div>
      <div className="flex z-10 flex-col justify-start gap-4">
        <div className="oswald-font-3 text-4xl sm:text-5xl md:text-7xl tracking-wide">
          <h1>EMPOWERING</h1>
          <h1 className="text-blue-500">DREAMS</h1>
        </div>
        <div>
          <p className="text-xl great-vibes-regular text-yellow-400 sm:text-2xl tracking-wide">Revolutionizing Present, Transforming Future</p>
        </div>
        <div>
          <p className="border-4 text-justify border-l-blue-400 border-r-0 border-t-0 border-b-0 pl-4 text-sm md:text-xl font-[Open_Sans]">
            At UNNATI WELFARE SOCIETY, we are dedicated to bridging the digital divide by providing underprivileged students with essential technology education and basic knowledge. Our mission is to empower these young minds, equipping them with the skills and confidence needed to excel in the digital age. By revolutionizing the present with hands-on tech training and nurturing a passion for learning, we aim to transform their futures, creating a brighter, more inclusive world for the next generation. Join us in making a difference today and shaping a better tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
