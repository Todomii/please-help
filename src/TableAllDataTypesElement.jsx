import TableArrayElement from "./TableArrayElement";
import TableElement from "./TableElement";
import TableObjectElement from "./TableObjectElement";

function TableAllDataTypesElement({ item, unallowedInfo }) {
  {
    // mapa kroz sve propertije objketa i rendera potrebnu komponentu ako je objekt ili lista ili običan podatak
    return Object.entries(item).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <TableArrayElement
            key={key}
            id={key}
            value={value}
            unallowedInfo={unallowedInfo}
          />
        );
      } else if (typeof value === "object") {
        return (
          <td className="px-4 py-2">
            <TableObjectElement key={key} id={key} value={value} />
          </td>
        );
      } else {
        if (!unallowedInfo.includes(key)) {
          return <TableElement id={key} key={key} value={value} />;
        }
      }
    });
  }
}

export default TableAllDataTypesElement;
