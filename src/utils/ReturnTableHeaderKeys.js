function ReturnTableHeaderKeys(object) {
  return Object.keys(object).map((item) => {
    return {
      name: item,
      isSortable: item === "dateTime",
    };
  });
}

export default ReturnTableHeaderKeys;
