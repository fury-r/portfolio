"use client";
import { useRouter } from "next/navigation";
import { TPageVersion } from "../types/page";
import React from "react";

const page = () => {
  const pageVersion: TPageVersion =
    (localStorage.getItem("page") as TPageVersion) || "v1";
  const { push } = useRouter();
  push(pageVersion);

  return <div>page</div>;
};
export default page;
