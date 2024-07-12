import { useDataContext } from "../../context/DataContext/useContext";

const About = () => {
  const {
    profile: { about },
  } = useDataContext();
  return (
    <div key="about">
      <p className=" font[1.6rem]">{about}</p>
    </div>
  );
};

export default About;
