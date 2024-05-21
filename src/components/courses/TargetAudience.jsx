import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { FaCheck } from "react-icons/fa6";

const TargetAudience = ({ targetAudience }) => {
  return (
    <div className=" pt-10">
      <SectionTitle
        size={" text-[17px]  md:text-[22px]"}
        title_1={"কোর্সটি  "}
        title_2={"যাদের জন্য?"}
      />
      {/* inside  contentt section  */}
      <div className=" border bg-primary-muted border-white-muted p-6 rounded-lg ">
        <div className=" grid grid-cols-1  sm:grid-cols-2 gap-4">
          {targetAudience?.map((item, index) => (
            <div
              key={index}
              className=" flex items-center gap-3 text-white-base"
            >
              <div className=" w-[22px] h-[22px] flex justify-center items-center  bg-blue-base  rounded-full  text-white-base  bg-">
                <FaCheck className="text-[12px] " />
              </div>
              <p>{item?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TargetAudience;
