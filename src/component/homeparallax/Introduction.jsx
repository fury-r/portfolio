import React from "react";
import Tilty from "react-tilty";
import Pic from "../../assets/img/pic.png";
import { Image } from "react-bootstrap";
const Introduction = () => {
  return (
    <div className="flex flex-col min-h-screen justify-start   ">
     <div>
        
     </div>
    <div className="flex flex-row justify-around items-center ">
        <div className="flex flex-col">
        <div className="jumbotron ">
              <div class="profile-text animate-fade-in-top">
                <label className='opacity-60 ' >Hello!</label>
                
              </div>
            </div>
            <label className="text-2xl font-bold opacity-60">My name is Rajeev Dessai</label>
        </div>
      <Tilty style={{ transformStyle: "preserve-3d" }} className="p-2 mt-10 ">
        <Image
          src={Pic}
          fluid
          alt="User Photo"
          width="220"
          className="neuromorphic-border-animation responsive border-2 "
          roundedCircle
          style={{ transform: "translateZ(30px)", objectFit: "cover" }}
        />
      </Tilty>

    </div>
        <div className="flex flex-col m-10 w-full">
   
      <div className="shadow-md p-4  rounded-xl bg-white mt-10 w-2/3">
        <label className="text-xl text-gray-500 "> I am a Software Developer I am  a Full Stack Developer.Currently pursuing MSc IT.</label>
      </div>
        </div>
    </div>
  );
};
export default Introduction;
