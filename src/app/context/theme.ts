import { css } from "styled-components"
const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  padding: 1.25rem 1.75rem;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 4px 4px 0 0 var(--green);
    transform: translate(-5px, -5px);
  }
  &:after {
    display: none !important;
  }
`;

export const dark = {
    background_color: "#183D3D",
    color: "whitesmoke",
    box_shadow_1: "#183D3D",
    box_shadow_2: "#183D3D",
    border_shadow_1: "#191919",
    border_shadow_2: "#212121",
    background: "#5C8374",
    theme_text: "whitesmoke",
    image: "-10px -10px 20px #171717,10px 5px 20px  #232323",
    buttonshadow: "-5px -5px 18px #183D3D ,    5px 5px 18px #183D3D",
    bordershadow: "-10px -10px 20px  #183D3D,10px 5px 20px #183D3D ",
    textshadow: "-10px 5px 11px #183D3D,  5px -8px 6px #183D3D ",
    text_shadow: "#1d1d1d",
    mixins :{
        flexCenter: css`
          display: flex;
          justify-content: center;
          align-items: center;
        `,
      
        flexBetween: css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `,
      
        link: css`
          display: inline-block;
          text-decoration: none;
          text-decoration-skip-ink: auto;
          color: inherit;
          position: relative;
          transition: var(--transition);
      
          &:hover,
          &:focus-visible {
            color: var(--green);
            outline: 0;
          }
        `,
      
        inlineLink: css`
          display: inline-block;
          position: relative;
          color: var(--green);
          transition: var(--transition);
      
          &:hover,
          &:focus-visible {
            color: var(--green);
            outline: 0;
            &:after {
              width: 100%;
            }
            & > * {
              color: var(--green) !important;
              transition: var(--transition);
            }
          }
          &:after {
            content: '';
            display: block;
            width: 0;
            height: 1px;
            position: relative;
            bottom: 0.37em;
            background-color: var(--green);
            opacity: 0.5;
            @media (prefers-reduced-motion: no-preference) {
              transition: var(--transition);
            }
          }
        `,
      
        button,
      
        smallButton: css`
          color: var(--green);
          background-color: transparent;
          border: 1px solid var(--green);
          border-radius: var(--border-radius);
          padding: 0.75rem 1rem;
          font-size: var(--fz-xs);
          font-family: var(--font-mono);
          line-height: 1;
          text-decoration: none;
          transition: var(--transition);
      
          &:hover,
          &:focus-visible {
            outline: none;
            box-shadow: 3px 3px 0 0 var(--green);
            transform: translate(-4px, -4px);
          }
          &:after {
            display: none !important;
          }
        `,
      
        bigButton: css`
          color: var(--green);
          background-color: transparent;
          border: 1px solid var(--green);
          border-radius: var(--border-radius);
          padding: 1.25rem 1.75rem;
          font-size: var(--fz-sm);
          font-family: var(--font-mono);
          line-height: 1;
          text-decoration: none;
          transition: var(--transition);
      
          &:hover,
          &:focus-visible {
            outline: none;
            box-shadow: 4px 4px 0 0 var(--green);
            transform: translate(-5px, -5px);
          }
          &:after {
            display: none !important;
          }
        `,
      
        boxShadow: css`
          box-shadow: 0 10px 30px -15px var(--navy-shadow);
          transition: var(--transition);
      
          &:hover,
          &:focus-visible {
            box-shadow: 0 20px 30px -15px var(--navy-shadow);
          }
        `,
      
        fancyList: css`
          padding: 0;
          margin: 0;
          list-style: none;
          font-size: var(--fz-lg);
          li {
            position: relative;
            padding-left: 30px;
            margin-bottom: 10px;
            &:before {
              content: '▹';
              position: absolute;
              left: 0;
              color: var(--green);
            }
          }
        `,
      
        resetList: css`
          list-style: none;
          padding: 0;
          margin: 0;
        `,
      }

}
export const light = {
    background_color: "#ebebed",
    color: "black",
    box_shadow_1: "#b1b1b5",
    box_shadow_2: "#efeff5",
    border_shadow_1: "#b1b1b5",
    border_shadow_2: "#efeff5",
    background: "linear-gradient(315deg, #ebebed, #ebebed)",
    theme_text: "grey",
    image: " -10px -10px 30px #c8c8c9, 15px 15px 30px #ffffff",
    buttonshadow: "   -12px -12px 24px #c8c8c9,12px 12px 24px #ffffff",
    bordershadow: " -15px -15px 30px #c8c8c9, 15px 15px 30px #ffffff",
    textshadow: " -6px 6px 15px #c8c8c9, 6px -6px 15px #ffffff",
    text_shadow: "#ebebed"

}

export const blackandwhite = {

}
export const glossy = {

}