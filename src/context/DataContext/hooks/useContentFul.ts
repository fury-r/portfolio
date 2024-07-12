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

export const useContentFul = () => {
  const client = createClient({
    space: import.meta.env.VITE_APP_PUBLIC_CONTENT_SPACE_ID,
    accessToken: import.meta.env.VITE_APP_PUBLIC_CONTENT_ACCESS_TOKEN,
  });

  const [profile, setProfile] = useState<TProfile>({
    about: "-",
    name: "-",
    position: "-",
    picture: null,
  });

  const [company, setCompany] = useState<TCompany[]>(companyData);
  const [education, setEducation] = useState<TEducation[]>([]);

  const [services, setServices] = useState<TService[]>([]);
  const [projects, setProjects] = useState<TProject[]>([]);
  const [tech, setTech] = useState<TTech[]>([]);
  const [social, setSocial] = useState<TSocial[]>(socials);

  const [isPending, setState] = useTransition();

  const getProfile = useCallback(async () => {
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
  }, [client]);

  const getCompany = useCallback(async () => {
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
  }, [client]);

  const getServices = useCallback(async () => {
    try {
      const response = await client.getEntries({ content_type: "doings" });
      if (response.items.length > 0)
        setServices(response.items.map((item) => item.fields) as TService[]);
    } catch (error) {
      console.error(error);
    }
  }, [client]);

  const getProjects = useCallback(async () => {
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
  }, [client]);

  const getEducations = useCallback(async () => {
    try {
      const response = await client.getEntries({ content_type: "education" });
      if (response.items.length > 0)
        setEducation(response.items.map((item) => item.fields) as TEducation[]);
    } catch (error) {
      console.error(error);
    }
  }, [client]);

  const getTech = useCallback(async () => {
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
  }, [client]);

  const getSocial = useCallback(async () => {
    try {
      const response = await client.getEntries({ content_type: "social" });
      if (response.items.length > 0)
        setSocial(response.items.map((item) => item.fields) as TSocial[]);
    } catch (error) {
      console.error(error);
    }
  }, [client]);

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
