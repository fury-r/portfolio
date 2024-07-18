import PageLayout from "./components/Page/PageLayout";
import About from "./about/About";
import { ServiceCards } from "./about/ServiceCards";

const Portfolio = () => {
  return (
    <div>
      <PageLayout
        title="About Me"
        inViewAnimateTitle={true}
        sections={[
          {
            component: <About />,
            inViewAnimate: true,
          },
          {
            title: "What I am doing",
            component: <ServiceCards />,
            inViewAnimateTitle: true,
          },
        ]}
      />
    </div>
  );
};

export default Portfolio;
