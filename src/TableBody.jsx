import TableAllDataTypesElement from "./TableAllDataTypesElement";

const TableBody = ({ items, unallowedInfo, tableType, actions }) => {
  return (
    <tbody>
      {items.map((item) => (
        <tr
          key={item.id}
          className=" border-b-[1px] border-gray-300 text-center"
        >
          {tableType === "report" || tableType === "object" ? (
            <td>
              <input
                type="checkbox"
                value={item.id}
                className=" accent-black"
              />
            </td>
          ) : null}
          {/* Komponenta koja ispisuje podatke reda tablice */}
          <TableAllDataTypesElement item={item} unallowedInfo={unallowedInfo} />
          <td>{actions && <div>Action Buttons</div>}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
