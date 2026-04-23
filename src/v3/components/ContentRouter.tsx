import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Routes as RoutePaths } from "../Routes/path";
import AboutSection from "../sections/AboutSection";
import ResumeSection from "../sections/ResumeSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";

const ContentRouter: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={RoutePaths.about.path} element={<AboutSection />} />
        <Route path={RoutePaths.resume.path} element={<ResumeSection />} />
        <Route path={RoutePaths.project.path} element={<ProjectsSection />} />
        <Route path={RoutePaths.contact.path} element={<ContactSection />} />
        <Route path="*" element={<AboutSection />} />
      </Routes>
    </AnimatePresence>
  );
};

export default ContentRouter;
