import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";
import AnimateInView from "../AnimateInView/AnimateInView";

const StyledPageLayout = styled(motion.div)`
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
    width: 0;
    height: 3px;
    background: var(--accent);
    border-radius: 3px;
    animation: title-line 450ms ease-in-out forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .title::after {
      animation: none;
      width: 40px;
    }
  }
  @media (min-width: 580px) {
    .title::after {
      height: 5px;
    }
  }
  @keyframes title-line {
    to {
      width: 40px;
    }
  }
`;
const PageLayout = ({
  sections,
  title,
  inViewAnimateTitle = false,
}: {
  sections: {
    title?: string;
    component: ReactNode;
    inViewAnimate?: boolean;
    inViewAnimateTitle?: boolean;
  }[];
  title: string;
  inViewAnimateTitle?: boolean;
}) => {
  return (
    <StyledPageLayout className="h-full w-full p-3 relative ">
      <AnimateInView animate={inViewAnimateTitle}>
        <h1 className="text-3xl font-bold title absolute top-0  left-0 w-fit">
          {title}
        </h1>
      </AnimateInView>

      <div className="grid grid-cols-auto gap-2 mt-10">
        {sections.map(
          ({ title, component, inViewAnimate, inViewAnimateTitle }, index) => (
            <div
              className="flex flex-col "
              key={`section-${(index + 1).toString()}`}
            >
              {title && (
                <AnimateInView animate={inViewAnimateTitle}>
                  <h2 className="font-bold my-3 text-2xl ">{title}</h2>
                </AnimateInView>
              )}
              <AnimateInView animate={inViewAnimate}>{component}</AnimateInView>
            </div>
          )
        )}
      </div>
    </StyledPageLayout>
  );
};

export default PageLayout;
