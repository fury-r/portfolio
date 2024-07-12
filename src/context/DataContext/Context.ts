import React from "react";
import { TProfile } from "./types";
import {
  TCompany,
  TEducation,
  TProject,
  TService,
  TSocial,
  TTech,
} from "../../types/component";

export const DataContext = React.createContext<{
  isPending: boolean;
  profile: TProfile;
  company: TCompany[];
  services: TService[];
  projects: TProject[];
  education: TEducation[];
  social: TSocial[];
  tech: TTech[];
} | null>(null);
