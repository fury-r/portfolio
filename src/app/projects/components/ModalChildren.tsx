import { Container } from "react-bootstrap";
import { MenuItem } from "../types";

import Image from "next/image";
import "../css/style.css";
export const ModalChildren = (props: MenuItem) => {
  return (
    <Container className="grid grid-rows-2 h-96">
      <div
        style={{}}
        className="grid grid-cols-2 grid-rows-2 w-1/5 m-2  imageContainer"
      >
        {props.images?.map((image) => (
          <Image src={image} className="w-40 rounded-md " alt="image" />
        ))}
      </div>
    </Container>
  );
};
