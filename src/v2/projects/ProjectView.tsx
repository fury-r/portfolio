import { ProjectsMenu } from "../../data/project";
import { TCategorisedPhoto, TCategory } from "../../types/component";
import { CategorisedPhotoView } from "../components/CategorisedPhotoView/CategorisedPhotoView";

const ProjectView = () => {
  return (
    <CategorisedPhotoView<TCategory>
      data={ProjectsMenu}
      onClick={(value: TCategorisedPhoto<TCategory>) => {
        const a = document.createElement("a");
        a.href = value.url;
        a.target = "_blank";
        document.appendChild(a);
        a.click();
        document.removeChild(a);
      }}
    />
  );
};

export default ProjectView;
