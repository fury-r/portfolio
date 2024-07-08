const Location = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773.139313804106!2d73.80863480000001!3d15.3958405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc7f3635e9997%3A0x5f896b7ce330450e!2sVasco%20Da%20Gama%2C%20Goa!5e0!3m2!1sen!2sin!4v1719748066744!5m2!1sen!2sin"
        width="100%"
        height="450"
        loading="lazy"
        style={{ borderRadius: "var(--rounded)" }}
        className="z-6"
      />
    </div>
  );
};

export default Location;
