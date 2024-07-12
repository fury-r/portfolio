import { uniq } from "lodash";
import { useState } from "react";
import { ShadowContainer } from "../Container";
import { TCategorisedPhoto } from "../../../types/component";
import styled from "styled-components";

interface ICategorisedPhotoView<T> {
  subLabel: string;
  data: TCategorisedPhoto<T>[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: Function;
}

const CategoryContainer = styled(ShadowContainer)`
  &:hover {
    transition: 0.3 ease-in-out;
    .show {
      transition: 0.3 ease-in-out;

      display: initial;
    }
    img {
      display: none;
    }
  }
  .show {
    display: none;
  }
`;

export const CategorisedPhotoView = <T,>({
  data,
  onClick,
  subLabel,
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
          <CategoryContainer
            key={index}
            onClick={() => onClick(value)}
            className=" rounded-lg grid grid-cols-1 p-3 md:h-[250px] max-md:h-[200px]"
          >
            <div className="min-h-[70%] overflow-hidden hover:scale-[1px] w-full">
              <img
                src={value.image}
                loading="lazy"
                alt={value.title}
                className="rounded-lg h-full w-full object-fit"
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
            <div className="show flex flex-col mt-3 overflow-hidden ">
              <h2 className="font-semibold">{subLabel}</h2>
              <div className="flex flex-row flex-wrap overflow-hidden text-ellipsis  ">
                {value.subItems.map((v, index) => (
                  <span className="m-2" key={index + 1}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </CategoryContainer>
        ))}
      </div>
    </div>
  );
};
