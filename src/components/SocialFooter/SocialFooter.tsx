import { IconType } from "react-icons/lib";
import { useDataContext } from "../../context/DataContext/useContext";
import { iconMap } from "../../data/icon";
import { useGlobalContext } from "../../context/GlobalContext/useContext";

const SocialFooter = () => {
  const { social } = useDataContext();
  const { pageVersion } = useGlobalContext();
  return (
    <div className="flex flex-row  items-center justify-center m-5 ">
      {social
        .filter(
          (value) =>
            !["contact", ...(pageVersion === "v2" ? ["email"] : [])].includes(
              value.css
            )
        )
        .map((value, key) => {
          let Icon: string | JSX.Element | IconType = "-";
          if (value.css) {
            Icon = iconMap[value.css];
            Icon = <Icon />;
          }
          return (
            <a
              key={key}
              href={value.href}
              className={
                "social-buttons__button social-button social-button--" +
                value.css
              }
              aria-label={value.label}
            >
              {Icon}
            </a>
          );
        })}
    </div>
  );
};

export default SocialFooter;
