import { ReactNode } from "react";
import styled from "styled-components";

const StyledPageLayout = styled.div`
  .title {
    position: relative;
    margin-bottom: 15px;
    padding: 10px 0;
  }
  .title::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0px;
    width: 30px;
    height: 3px;
    background: var(--accent);
    border-radius: 3px;
  }
  @media (min-width: 580px) {
    .title::after {
      width: 40px;
      height: 5px;
    }
  }
`;
const PageLayout = ({
  sections,
  title,
}: {
  sections: {
    title?: string;
    component: ReactNode;
  }[];
  title: string;
}) => {
  return (
    <StyledPageLayout className="h-full w-full p-3 relative ">
      <h1 className="text-3xl font-bold title absolute top-0  left-0 w-fit">
        {title}
      </h1>
      <div className="grid grid-cols-auto gap-2 mt-10">
        {sections.map(({ title, component }, index) => (
          <div
            className="flex flex-col "
            key={`section-${(index + 1).toString()}`}
          >
            {title && <h2 className="font-bold my-3 text-2xl ">{title}</h2>}
            {component}
          </div>
        ))}
      </div>
    </StyledPageLayout>
  );
};

export default PageLayout;
