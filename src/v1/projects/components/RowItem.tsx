import styled from "styled-components";
import { TCategorisedPhoto, TCategory } from "../../../types/component";
import {
  AnimatedStyledLabel,
  AnimatedButton,
  ThemeContainer,
} from "../../context/component";
import { MenuItem } from "../types";
const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  border-radius: var(--border-radius);

  @media (max-width: 768px) {
    ${({ theme }) => theme?.mixins?.boxShadow};
    height: 70%;
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;
      margin-left: 70px;
      @media (max-width: 768px) {
        justify-content: flex-start;
        margin: 0;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
      .image-button {
        display: block;
      }
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--color);
    font-family: var(--font-mono);
    font-size: var(--fz-xl);
    font-weight: 600;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: "";
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme?.mixins?.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: ${({ theme }) => theme?.secondary};
    color: var(--color);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme?.mixins?.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px;
    margin-right: 70px;

    padding: 0px 5px 0 0;
    list-style: none;
    white-space: pre-wrap;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--color);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme?.mixins?.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme?.mixins?.smallButton};
      margin: 10px;
    }
  }
  .color-grey {
    width: 100%;
    height: 100%;
    background-color: transparent;

    border-radius: var(--border-radius);

    &:hover,
    &:focus {
      background-color: var(--shade);
      outline: 0;
      vertical-align: middle;
      .image-link {
        display: block;
      }
      &:before,
      .img {
        background-color: var(--shade);
      }
    }

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      transition: var(--transition);
      background-color: var(--navy);
      mix-blend-mode: screen;
      border-radius: var(--border-radius);
    }
  }
  .project-image {
    /* ${({ theme }) => theme?.mixins?.boxShadow}; */
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    border-radius: var(--border-radius);

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      opacity: 0.25;
    }
    .image-link {
      display: none;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
    }
    .img {
      border-radius: var(--border-radius);
      width: 100%;
      mix-blend-mode: multiply;

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
  .image-button {
    display: none;
    z-index: 5;
    align-self: center;
    width: 100%;
    &:hover {
      filter: grayscale(100%) contrast(1) brightness(50%);
    }
  }
  a {
    text-decoration: none;
    color: var(--accent);
  }
`;
export const RowItem = (
  props: TCategorisedPhoto<TCategory> & {
    setSelected: (data: null | MenuItem) => void;
    pos: number;
  }
) => {
  return (
    <StyledProject>
      <div className="project-content">
        <div>
          <h3 className="project-overline">{props.title}</h3>
          <ThemeContainer className="project-description">
            {props.description}
          </ThemeContainer>
          {(props.subItems || []).length && (
            <ul className="project-tech-list">
              {props.subItems?.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
          <AnimatedButton className="image-button ">
            <a
              className=" image-link"
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Github
            </a>
          </AnimatedButton>
        </div>
      </div>

      <div className="project-image  color-grey rounded-[10px] relative">
        <img src={props.image!} className="img  w-full" alt="image" />
        {props.url && (
          <a
            className=" image-link"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedStyledLabel>View on Github</AnimatedStyledLabel>
          </a>
        )}
      </div>
    </StyledProject>
  );
};
