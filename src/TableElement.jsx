const TableElement = ({ id, value }) => {
  return (
    <td key={id} className="px-4 py-2">
      {value}
    </td>
  );
};

export default TableElement;
