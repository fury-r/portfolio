"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [captchaVerified, setCaptchaVerified] = useState(true);
  const form = useRef<HTMLFormElement>(null);
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        form.current as HTMLFormElement,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success("Message has been sent.Thank You 🙂!");
        },
        (error) => {
          console.error(error);
          toast.error("Failed to send.Try again 🙁!");
        }
      );
    form.current?.reset();
  };

  return (
    <form ref={form} onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-2 gap-10 my-3">
        <input placeholder="Username" />
        <input placeholder="Email" />
      </div>
      <textarea placeholder="Description" rows={3} className="w-full p-3 " />
      <div className="flex justify-center m-4 ">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
          onChange={(e) => {
            setCaptchaVerified(e === null);
          }}
        />
      </div>
      <div className="flex flex-row justify-center">
        <button disabled={!captchaVerified} className="btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
