import { motion } from "framer-motion";
import { IconBaseProps } from "react-icons/lib";
import styled from "styled-components";
import AnimateInView from "../AnimateInView/AnimateInView";

export type TTimeLine = {
  title: string;
  subTitle?: string;
  date?: string;
  description?: string;
};

export type TTimeLineEvent = TTimeLine & {
  subItems?: Omit<TTimeLine, "title">[];
};

interface ITimeLine {
  data: TTimeLineEvent[];
  title: string;
  icon: (props?: IconBaseProps) => JSX.Element;
}

const StyledTimeline = styled(motion.div)`
  .timeline-item:not(:last-child)::before {
    content: "";
    position: absolute;
    top: -45px;
    left: -20px;
    width: 1.5px;
    height: calc(100% + 100px);
    background: var(--primary);
  }
  .timeline-item::after {
    content: "";
    position: absolute;
    top: 8px;
    left: -26px;
    height: 11px;
    width: 11px;
    border-radius: 30px;
    background: var(--accent);
    box-shadow: var(--primary) 0px 0px 0px 5px;
  }
`;

const TimeLine = ({ data, icon, title }: ITimeLine) => {
  return (
    <StyledTimeline className="px-2">
      <div style={{ position: "relative", paddingLeft: "20px" }}>
        <div style={{ marginBottom: "40px", position: "relative" }}>
          <div className="z-10  left-[-35px] p-1 rounded-lg absolute h-[30px] w-fit flex flex-row justify-center items-end">
            {icon({
              style: { height: "100%", width: "100%", color: "var(--accent)" },
            })}
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {data?.map((item, index) => (
          <AnimateInView
            key={index}
            style={{ marginBottom: "40px", position: "relative" }}
            className="flex flex-col timeline-item"
            animate
          >
            <>
              <h3 className="font-bold" style={{ marginBottom: "5px" }}>
                {item.title}
              </h3>
              <h3 className="font-semibold" style={{ marginBottom: "5px" }}>
                {item.subTitle}
              </h3>

              <span
                style={{ fontSize: "14px", color: "var(--accent)" }}
                className="font-semibold"
              >
                {item.date}
              </span>
            </>
            {item.subItems?.map((sub, index) => (
              <div
                key={index}
                style={{ marginBottom: "0", position: "relative" }}
                className="flex flex-col mb-5"
              >
                <h3 className="font-semibold" style={{ marginBottom: "5px" }}>
                  {sub.subTitle}
                </h3>
                <span
                  style={{ fontSize: "14px", color: "var(--accent)" }}
                  className="font-semibold"
                >
                  {sub.date}
                </span>
                <p style={{ marginTop: "10px" }}>{sub.description}</p>
              </div>
            ))}
            <p style={{ marginTop: "10px" }}>{item.description}</p>
          </AnimateInView>
        ))}
      </div>
    </StyledTimeline>
  );
};

export default TimeLine;
