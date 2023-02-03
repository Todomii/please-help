const TableObjectElement = ({ id, value }) => {
  return (
    <span key={id}>
      {Object.entries(value).map(([key, value]) => {
        return <span key={key}>{value}</span>;
      })}
    </span>
  );
};

export default TableObjectElement;
