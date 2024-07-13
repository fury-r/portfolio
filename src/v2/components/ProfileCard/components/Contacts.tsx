import styled from "styled-components";
import { useDataContext } from "../../../../context/DataContext/useContext";
import { iconMap } from "../../../../data/icon";
import { IconType } from "react-icons/lib";
type TContact = {
  icon?: string;
  label: string;
  code?: any;
  value?: string;
  css?: string;
};

export const Item = ({ label, code, css, value }: TContact) => {
  let IconElem: string | JSX.Element | IconType = "-";
  if (css) {
    IconElem = iconMap[css];
    IconElem = <IconElem style={{ width: "50%", height: "50%" }} />;
  }
  return (
    <div
      key={`contact-item`}
      className=" grid grid-cols-10 p-1 items-center w-full max-md:col-span-1 "
    >
      <div className="col-span-3 flex flex-row justify-center  items-center h-full">
        {IconElem}
      </div>
      <div className="col-span-7">
        <div className="text-xs">{label}</div>
        {code ? (
          <div
            className="text-ellipsis whitespace-nowrap overflow-hidden"
            dangerouslySetInnerHTML={{ __html: code }}
          />
        ) : css === "contact" ? (
          <div
            className="text-ellipsis overflow-hidden whitespace-nowrap"
            onClick={() => window.open(`tel:${value}`)}
          >
            {value}
          </div>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

const StyledContainer = styled.div`
  padding: 3px 5px;
  &::after,
  &::before {
    content: "";

    width: 100%;
    height: 1px;
    background-color: gray;
    opacity: 0.5;
  }

  &::after {
    margin-top: 10px;
  }

  &::before {
    margin-bottom: 10px;
  }
`;

export const Contacts = () => {
  const { social } = useDataContext();
  return (
    <StyledContainer className="w-full grid grid-cols-1  h-fit ">
      <div className=" grid grid-cols-1 max-md:grid-cols-2">
        {social
          .filter((value) => ["contact", "email"].includes(value.css))
          .map((value, index) => (
            <Item {...value} key={(index + 1).toString()} />
          ))}
      </div>
    </StyledContainer>
  );
};
