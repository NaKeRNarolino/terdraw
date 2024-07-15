export const Button = ({
  children,
  onClick,
  id,
  className,
}: {
  children: JSX.Element;
  onClick: () => void;
  id?: string;
  className?: string;
}) => {
  return (
    <>
      <button onClick={onClick} className={`${className ?? ""}`} id={id ?? ""}>
        {children}
      </button>
    </>
  );
};
