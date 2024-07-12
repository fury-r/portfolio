import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { useGlobalContext } from "../context/GlobalContext/useContext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { pageVersion } = useGlobalContext();
  const push = useNavigate();

  useEffect(() => {
    push(`/${pageVersion}`);
  }, [pageVersion, push]);

  return <Loader />;
};

export default Landing;
