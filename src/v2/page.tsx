import PageLayout from "./components/Page/PageLayout";
import About from "./about/About";
import { ServiceCards } from "./about/ServiceCards";

const Portfolio = () => {
  return (
    <div>
      <PageLayout
        title="About Me"
        sections={[
          {
            component: <About />,
          },
          {
            title: "What I am doing",
            component: <ServiceCards />,
          },
        ]}
      />
    </div>
  );
};

export default Portfolio;
