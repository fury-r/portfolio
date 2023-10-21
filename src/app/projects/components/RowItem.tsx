import { GlassContainer, StyledButton, StyledLabel } from "../../context/component";
import Image from "next/image";
import { MenuItem } from "../types";
export const RowItem = (props: MenuItem &{
    setSelected:React.Dispatch<React.SetStateAction<number>>,
    pos:number
}) => (
    <GlassContainer onClick={()=>props.setSelected(props.pos)} className="grid grid-cols-1 gap-1  h-full">
      <StyledLabel className=" font-bold">{props.title}</StyledLabel>
      <div className="grid grid-cols-2">
          {props.iconImage && (
            <Image
              src={props.iconImage}
              className="w-40 rounded-md "
              alt="image"
            />
          )}
        <StyledLabel className=" text-base ">
          {props.desc}
        </StyledLabel>
      </div>
  
    </GlassContainer>
  );