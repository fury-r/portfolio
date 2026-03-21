import { createClient } from "contentful";
import {
  useCallback,
  useEffect,
  useState,
  startTransition,
  useTransition,
} from "react";
import { TProfile } from "../types";
import {
  TCompany,
  TEducation,
  TProject,
  TService,
  TSocial,
  TTech,
} from "../../../types/component";
import { socials } from "../../../data/socials";
import { companyData } from "../../../data/company";
import { services as localServices } from "../../../data/service";
import { techData } from "../../../data/tech";
import { ProjectsMenu } from "../../../data/project";

const hasContentfulCredentials =
  !!import.meta.env.VITE_APP_PUBLIC_CONTENT_SPACE_ID &&
  !!import.meta.env.VITE_APP_PUBLIC_CONTENT_ACCESS_TOKEN;

const client = hasContentfulCredentials
  ? createClient({
      space: import.meta.env.VITE_APP_PUBLIC_CONTENT_SPACE_ID,
      accessToken: import.meta.env.VITE_APP_PUBLIC_CONTENT_ACCESS_TOKEN,
    })
  : null;

const localProfile: TProfile = {
  name: "Rajeev Dessai",
  position: "Software Engineer",
  about:
    "Software Engineer with 3 years of experience in full-stack web development. Proven ability to work independently and as part of a team to deliver high-quality products on time. Eager to learn new technologies and take on new challenges.",
  picture: null,
};

const localEducation: TEducation[] = [
  {
    name: "Parvatibai Chowgule College (Goa University)",
    title: "Master of Science in Information Technology",
    duration: "2021 — 2023",
    link: "",
    course: "MSc Information Technology",
    marks: "9.47 CGPA",
    description: "Master of Science in Information Technology. CGPA: 9.47/10",
  },
  {
    name: "Parvatibai Chowgule College (Goa University)",
    title: "Bachelors in Vocation (Software Development)",
    duration: "2018 — 2021",
    link: "",
    course: "BVoc Software Development",
    marks: "8.02 CGPA",
    description: "Bachelors in Vocation in Software Development. CGPA: 8.02/10",
  },
];

const localProjects: TProject[] = ProjectsMenu.map((p) => ({
  title: p.title,
  type: p.type,
  images: [p.image],
  link: p.link,
  description: p.description,
  techStack: p.subItems.map((s) => ({ title: s })),
}));

export const useContentFul = () => {

  const [profile, setProfile] = useState<TProfile>(localProfile);
  const [company, setCompany] = useState<TCompany[]>(companyData);
  const [education, setEducation] = useState<TEducation[]>(localEducation);
  const [services, setServices] = useState<TService[]>(localServices);
  const [projects, setProjects] = useState<TProject[]>(localProjects);
  const [tech, setTech] = useState<TTech[]>(techData);
  const [social, setSocial] = useState<TSocial[]>(socials);

  const [isPending, setState] = useTransition();

  const getProfile = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "portfolio" });
      if (response.items.length > 0)
        setProfile({
          ...response.items[0].fields,
          //@ts-ignore
          picture: response.items[0].fields.picture?.fields?.file.url,
        } as TProfile);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCompany = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "company" });
      if (response.items.length > 0)
        startTransition(() =>
          setCompany(
            response.items.map((item: any) => ({
              ...item.fields,
              darkImage: item.fields?.darkImage?.fields?.file?.url,
              lightImage: item.fields?.lightImage?.fields?.file?.url,

              subItems: ((item.fields.subItems as any[]) || []).map(
                (value) => value.fields
              ),
            })) as TCompany[]
          )
        );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getServices = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "doings" });
      if (response.items.length > 0)
        setServices(response.items.map((item) => item.fields) as TService[]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getProjects = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "projects" });
      if (response.items.length > 0)
        setProjects(
          response.items.map((item: any) => ({
            ...item.fields,
            images: (item.fields.images || []).map(
              (value: any) => value?.fields?.file?.url
            ),
            techStack: (item.fields.techStack || []).map((value: any) => {
              //@ts-ignore will be present
              const tech = response?.includes["Entry"]?.find(
                (link) => value.sys.id === link.sys.id
              )?.fields;

              return {
                ...tech,
                lightIcon: tech?.lightIcon?.fields?.file?.url,
                darkIcon: tech?.darkIcon?.fields?.file?.url,
              };
            }),
          })) as TProject[]
        );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getEducations = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "education" });
      if (response.items.length > 0)
        setEducation(response.items.map((item) => item.fields) as TEducation[]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getTech = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "tech" });
      if (response.items.length > 0)
        setTech(
          response.items.map((item: any) => ({
            ...item.fields,
            darkIcon: item.fields.lightIcon?.fields?.file?.url,
            lightIcon: item.fields.lightIcon?.fields?.file?.url,
          })) as TTech[]
        );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getSocial = useCallback(async () => {
    if (!client) return;
    try {
      const response = await client.getEntries({ content_type: "social" });
      if (response.items.length > 0)
        setSocial(response.items.map((item) => item.fields) as TSocial[]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    setState(() => {
      getProfile();

      getServices();
      getCompany();
      getEducations();
      getProjects();
      getTech();
      getSocial();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isPending,
    profile,
    company,
    services,
    projects,
    education,
    tech,
    social,
    getSocial,
    getTech,
    getServices,
    getCompany,
    getProfile,
  };
};
