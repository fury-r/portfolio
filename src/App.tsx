import { useState } from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { ToastContainer } from "react-bootstrap";
import { useGlobalContext } from "./context/GlobalContext/useContext";
import { V2Router } from "./v2/Routes/routes";
import { V1Router } from "./v1/Routes/routes";
import { TPageVersion } from "./types/page";

const PAGES: TPageVersion[] = ["v1", "v2"];

const StyledContainer = styled.div`
  .option-btn {
    width: 50px;
    height: 50px;
    background-color: var(--primary);
    color: var(--color);
  }
  .btn:not(:last-child) ::before {
    content: "";
    width: 100%;
    height: 1px;
    margin-top: 5px;
    background-color: var(--secondary);
  }

  h2::after {
    content: "";
    width: 10%;
    color: var(--color);
  }
`;

function App() {
  const { pageVersion, changePageVersion } = useGlobalContext();
  const [show, setShow] = useState(false);

  return (
    <StyledContainer className="w-full h-full ">
      <div className=" fixed bottom-16 right-5 z-30 transition flex flex-col items-center ">
        <div
          className={`${
            !show ? "hidden" : ""
          }  flex flex-col justify-center mb-2  bg-[var(--primary)] rounded-lg`}
        >
          {PAGES.map((page, index) => (
            <button
              className="flex flex-col option-btn justify-center items-center"
              onClick={() => {
                setShow(false);
                changePageVersion(page);
              }}
              key={index + 1}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="btn round-btn w-1 flex flex-row justify-center items-center"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? (
            <IoClose />
          ) : (
            <h5 className="text-sm font-semibold shadow-md"> {pageVersion}</h5>
          )}
        </button>
      </div>
      {pageVersion === "v2" ? <V2Router /> : <V1Router />}
      <ToastContainer />
    </StyledContainer>
  );
}

export default App;
