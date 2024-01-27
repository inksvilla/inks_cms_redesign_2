import {
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
} from "@mui/x-data-grid";

export const setColumnFilters = (columns: GridColDef<any, any, any>[]) => {
  const newColumns = columns.map((column) => {
    if (column.type === "number") {
      column.filterOperators = getGridNumericOperators().filter(
        ({ value }) =>
          value === ">" ||
          value === "<" ||
          value === "=" ||
          value === ">=" ||
          value === "<=" ||
          value === "!="
      );
    } else {
      column.filterOperators = getGridStringOperators().filter(({ value }) => {
        return value === "equals" || value === "contains";
      });
    }

    // disable date filter. backend does not support date filter
    if (column.type === "date") {
      column.filterable = false;
    }
    return column;
  });
  return newColumns;
};
