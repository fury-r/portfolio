"use client";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
