import { uniq } from "lodash";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { ShadowContainer } from "../Container";

export type TCategorisedPhoto<T> = {
  type: T;
  image: StaticImageData;
  title: string;
  description: string;
  url: string;
  techStack: string[];
};

interface ICategorisedPhotoView<T> {
  data: TCategorisedPhoto<T>[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: Function;
}
export const CategorisedPhotoView = <T,>({
  data,
  onClick,
}: ICategorisedPhotoView<T>) => {
  const [selection, setSelection] = useState<T | "All">("All");
  return (
    <div>
      <div id="header" className="flex flex-row my-3 justify-end">
        <div onClick={() => setSelection("All")}>All</div>
        {uniq(data.map((value) => value.type)).map((value, index) => (
          <div
            className="mx-4"
            key={index}
            onClick={() => setSelection(value as T)}
          >
            {value as string}
          </div>
        ))}
      </div>
      <div className="grid max-md:grid-cols-2 md:grid-cols-3 gap-3">
        {(selection !== "All"
          ? data.filter((value) => value.type === selection)
          : data
        ).map((value, index) => (
          <ShadowContainer
            key={index}
            onClick={() => onClick(value)}
            className=" rounded-lg grid grid-cols-1 p-3 h-[250px] "
          >
            <div className="h-[70%] overflow-hidden hover:scale-[1px]">
              <Image
                src={value.image}
                loading="lazy"
                alt={value.title}
                className="rounded-lg h-full"
              />
            </div>
            <div className="h-[50%] ">
              <h2 className="my-4 text-sm font-bold h-30%">{value.title}</h2>
              <h3
                className=" text-ellipsis whitespace-nowrap overflow-hidden h-[70%]  text-sm"
                title={value.description}
              >
                {value.description}
              </h3>
            </div>
          </ShadowContainer>
        ))}
      </div>
    </div>
  );
};
