import { Suspense, useRef, useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_APP_PUBLIC_SERVICE_ID!,
        import.meta.env.VITE_APP_PUBLIC_TEMPLATE_ID!,
        form.current as HTMLFormElement,
        {
          publicKey: import.meta.env.VITE_APP_PUBLIC_PUBLIC_KEY,
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
    <Suspense fallback={<>loading...</>}>
      <form ref={form} onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-2 gap-10 my-3">
          <input placeholder="Name" />
          <input placeholder="Email" />
        </div>
        <textarea placeholder="Description" rows={3} className="w-full p-3 " />
        <div className="flex justify-center m-4 ">
          {import.meta.env.VITE_APP_PUBLIC_SITE_KEY && (
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_APP_PUBLIC_SITE_KEY!}
              onChange={(e) => {
                setCaptchaVerified(e !== null);
              }}
            />
          )}
        </div>
        <div className="flex flex-row justify-center">
          <button
            disabled={!captchaVerified}
            className={`btn ${!captchaVerified ? "opacity-30" : ""}`}
          >
            Submit
          </button>
        </div>
      </form>
    </Suspense>
  );
};

export default ContactForm;
