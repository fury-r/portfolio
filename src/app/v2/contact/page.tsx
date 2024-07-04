"use client";
import React from "react";
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
        },
      ]}
    />
  );
};

export default Contact;
