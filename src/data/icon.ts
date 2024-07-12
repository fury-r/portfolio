import { IconType } from "react-icons/lib";
import { MdMailOutline, MdPhone } from "react-icons/md";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaCamera,
} from "react-icons/fa";
import { CiMobile3, CiServer } from "react-icons/ci";
import { SiWebpack } from "react-icons/si";

export const iconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  contact: MdPhone,
  email: MdMailOutline,
  photography: FaCamera,
  webDev: SiWebpack,
  backendDev: CiServer,
  ["mobile-app-dev"]: CiMobile3,
};
