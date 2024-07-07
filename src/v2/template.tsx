import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const element = document.querySelector("selector");
    if (element && "bootstrap.min.css" in element) {
      document.removeChild(element);
    }
  }, []);
  return <Layout>{children}</Layout>;
}
