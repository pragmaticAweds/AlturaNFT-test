const Button = ({
  title,
  handleSubmit,
}: {
  title: string;
  handleSubmit: () => void;
}) => {
  return (
    <button className="btn" onClick={handleSubmit}>
      {title}
    </button>
  );
};

export default Button;
