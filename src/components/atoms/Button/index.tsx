const Button = ({
  title,
  handleSubmit,
  isLoading,
}: {
  title: string;
  handleSubmit?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <button className="btn" onClick={handleSubmit}>
      {isLoading ? (
        <span className="btn-loader btn-loader-primary"></span>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
