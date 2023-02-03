import TableObjectElement from "./TableObjectElement";

const TableArrayElement = ({ id, value }) => {
  return (
    <td className="flex justify-around px-4 py-2" key={id}>
      {value.slice(0, 4).map((value, index) => {
        if (typeof value === "object") {
          return <TableObjectElement id={index} value={value} key={index} />;
        } else {
          return <div key={index}>{value}</div>;
        }
      })}
    </td>
  );
};

export default TableArrayElement;
