import PageLayout from "../components/Page/PageLayout";
import Location from "./Location";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <PageLayout
      title="Contact"
      sections={[
        {
          component: <Location />,
        },
        {
          title: "Reach out.",
          component: <ContactForm />,
          inViewAnimate: true,
        },
      ]}
    />
  );
};

export default Contact;
