import React from "react";
import { MdMailOutline, MdPhone } from "react-icons/md";
import { IconBaseProps } from "react-icons/lib";
import styled from "styled-components";

type TContact = {
  icon: (props: IconBaseProps) => JSX.Element;
  label: string;
  value: string | JSX.Element;
};

const DATA: TContact[] = [
  {
    icon: (props: IconBaseProps) => <MdMailOutline {...props} />,
    label: "Email",
    value: (
      <a href="mailto:rajeev.dessai11@gmail.com">rajeev.dessai11@gmail.com</a>
    ),
  },
  {
    icon: (props: IconBaseProps) => <MdPhone {...props} />,
    label: "Contact",
    value: "+91 9158907407",
  },
];

export const Item = ({
  icon,
  label,
  value,
  key,
}: TContact & {
  key: string;
}) => {
  return (
    <div
      key={`contact-item-${key}`}
      className=" grid grid-cols-10 p-3 items-center h-[30%] w-full max-md:col-span-1 "
    >
      <div className="col-span-3 flex flex-row justify-center  items-center h-full">
        {icon({ style: { width: "50%", height: "50%" } })}
      </div>
      <div className="col-span-7">
        <div className="text-xs">{label}</div>
        <div className="text-ellipsis whitespace-nowrap overflow-hidden">
          {value}
        </div>
      </div>
    </div>
  );
};

const StyledContainer = styled.div`
  padding: 0 10px;

  &::after,
  &::before {
    content: "";

    width: 100%;
    height: 1px;
    background-color: gray;
  }
`;

export const Contacts = () => {
  return (
    <StyledContainer className="w-full grid grid-cols-1 h-full ">
      <div className=" grid grid-cols-1 max-md:grid-cols-2">
        {DATA.map((value, index) => (
          <Item {...value} key={(index + 1).toString()} />
        ))}
      </div>
    </StyledContainer>
  );
};
