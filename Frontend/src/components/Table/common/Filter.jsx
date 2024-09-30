import { rankItem } from "@tanstack/match-sorter-utils";

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function Filter({ column, index, table, headerGroup }) {
  const column_properties = headerGroup.headers[index].column.columnDef?.column_properties || {};
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  if (typeof firstValue === "string" && column_properties.type === "select") {
    return (
      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
        <select className="table-input " onChange={(e) => column.setFilterValue(e.target.value)}>
          {column_properties.options.map((option) => (
            <option key={`string_select_${column.id}_${option.state}`} value={option.state}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (typeof firstValue === "number" && column_properties.type === "select") {
    return (
      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
        <select className="table-input" onChange={(e) => column.setFilterValue((old) => [e.target.value, e.target.value])}>
          {column_properties.options.map((option) => (
            <option key={`number_select_${column.id}_${option.state}`} value={option.state}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return typeof firstValue === "number" ? (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className="table-input "
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className="table-input"
      />
    </div>
  ) : (
    <input
      className="table-input"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={columnFilterValue ?? ""}
    />
  );
}
