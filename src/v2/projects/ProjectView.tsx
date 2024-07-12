import { omit } from "lodash";
import { useDataContext } from "../../context/DataContext/useContext";
import { TCategorisedPhoto, TCategory } from "../../types/component";
import { CategorisedPhotoView } from "../components/CategorisedPhotoView/CategorisedPhotoView";

const ProjectView = () => {
  const { projects } = useDataContext();
  return (
    <CategorisedPhotoView<TCategory>
      data={projects.map((value) => ({
        ...omit(value, "techStack", "images"),
        subItems: value.techStack.map((value) => value.title),
        image: value.images[0],
      }))}
      onClick={(value: TCategorisedPhoto<TCategory>) => {
        const a = document.createElement("a");
        a.href = value.link;
        a.target = "_blank";
        document.appendChild(a);
        a.click();
        document.removeChild(a);
      }}
      subLabel="Tech Stack"
    />
  );
};

export default ProjectView;
