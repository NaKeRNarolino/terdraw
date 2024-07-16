export const Button = ({
  children,
  onClick,
  id,
  className,
  selected,
}: {
  children: JSX.Element;
  onClick: () => void;
  id?: string;
  className?: string;
  selected?: boolean;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className ?? ""} ${selected ? "selected" : ""}`}
        id={id ?? ""}
      >
        {children}
      </button>
    </>
  );
};
