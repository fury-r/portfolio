import { socials } from "../../data/socials";

const SocialFooter = () => {
  return (
    <div className="flex flex-row  items-center justify-center m-5 ">
      {socials.map((value, key) => (
        <a
          key={key}
          href={value.href}
          className={
            "social-buttons__button social-button social-button--" + value.css
          }
          aria-label={value.label}
        >
          {value.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialFooter;
