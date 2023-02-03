function ReturnTableHeaderElements(object) {
  return object.elements.map((element) => {
    return {
      name: element.name,
      isSortable: element.type === "date/time" || element.type === "number",
    };
  });
}

export default ReturnTableHeaderElements;
