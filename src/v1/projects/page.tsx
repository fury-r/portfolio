import { Container } from "react-bootstrap";

import { MenuItem } from "./types";
import { RowItem } from "./components/RowItem";
import { useModalContext } from "../context/ModalContext/useContext";
import styled from "styled-components";
import { ProjectsMenu } from "../../data/project";

const StyledContainer = styled(Container)`
  .imageContainer {
    gap: 5px;
    width: fit-content;
  }

  .imageContainer:hover {
    animation: imageSpread 0.5s forwards;
  }

  @keyframes imageSpread {
    100% {
      gap: 10px;
      width: fit-content;
    }
  }
`;
const Project = () => {
  const { setData } = useModalContext();
  const handleSetData = (data: MenuItem | null) => setData!(data);
  return (
    <StyledContainer className="h-full p-4">
      <Container className="grid grid-cols-1 ">
        {ProjectsMenu.map((item, index) => (
          <RowItem
            pos={index}
            key={index.toString()}
            setSelected={handleSetData}
            {...item}
          />
        ))}
      </Container>
    </StyledContainer>
  );
};
export default Project;
