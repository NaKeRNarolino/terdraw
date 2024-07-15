export const Container = ({
  children,
  className,
  id,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  id?: string;
}) => {
  return (
    <div className={`container ${className ?? ""}`} id={id ?? ""}>
      {children}
    </div>
  );
};
