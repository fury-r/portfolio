import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${({ theme }) => theme?.primary};
    --secondary: ${({ theme }) => theme?.secondary};
    --color: ${({ theme }) => theme?.color};
    --tertiary: ${({ theme }) => theme?.tertiary};
    --accent: ${({ theme }) => theme?.accent};
    --darkAccent: ${({ theme }) => theme?.darkAccent};
    --shadow-1: ${({ theme }) => theme?.shadow1};
    --shadow-2: ${({ theme }) => theme?.shadow2};
    --shadow-3: ${({ theme }) => theme?.shadow3};
    --rounded:${({ theme: { rounded } }) => rounded};
    --bg-gradient-primary:${({ theme: { bgGradientPrimary } }) =>
      bgGradientPrimary};
    --padding:0.75rem;
    background-color: var(--tertiary);
  }

  body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  background: var(--tertiary);
}

body::-webkit-scrollbar-thumb {
  border: 1px solid var(--primary);
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 20px;
  box-shadow: inset 1px 1px 0 hsla(0, 0%, 100%, 0.11),
    inset -1px -1px 0 hsla(0, 0%, 100%, 0.11);
}

body::-webkit-scrollbar-thumb:hover {
  background: hsla(0, 0%, 100%, 0.15);
}

body::-webkit-scrollbar-button {
  height: 60px;
  width:10px;
}


  .has-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px; 
}

.has-scrollbar::-webkit-scrollbar-track {
  background:var(--accent);
  border-radius: 5px;
}

.has-scrollbar::-webkit-scrollbar-thumb {
  background:var(--color);
  border-radius: 5px;
}

.has-scrollbar::-webkit-scrollbar-button {
  width: 20px;
}

.scroll {
  @media (max-width: 748px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    margin: 0 -15px;
    padding: 25px 15px;
    padding-bottom: 35px;
    overflow-x: auto;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
  }
}

.scroll-snap {
  @media (max-width: 748px) {
    scroll-snap-align: center;
    min-width: 100%;
  }
}


input,textarea{
  background-color: var(---secondary);
  border:1px solid var(--primary);

  flex-shrink: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 2;
  line-height: 1.5rem;
  border-radius: var(--rounded-btn, 0.5rem);
  border-width: 1px;
  border-color: transparent;
  --tw-bg-opacity: 1;

  border: 1px solid var(--primary);
}
input{
  height: 3rem;
}

`;
