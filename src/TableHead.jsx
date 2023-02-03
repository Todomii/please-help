const TableHead = ({ items }) => {
  return (
    <thead className="text-center bg-black text-white">
      <tr>
        {items.map((item, index) => {
          if (item.name !== "id") {
            return <th key={index}>{item.name}</th>;
          }
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
