import {
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
} from "@mui/x-data-grid";
import { ProductStatus, ServiceStatus, UserStatus } from "../constants";

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

export const getUserStatusColor = (status: string) => {
  if (status === UserStatus.Active) {
    return "success.main";
  } else if (status === UserStatus.Pending) {
    return "text.secondary";
  } else if (status === UserStatus.Blocked) {
    return "error.main";
  } else if (status === UserStatus.Suspended) {
    return "warning.main";
  }
  return "text.primary";
};

export const getProductStatusColor = (status: string) => {
  if (status === ProductStatus.Active) {
    return "success.main";
  } else if (status === ProductStatus.Inactive) {
    return "text.secondary";
  }
  return "text.primary";
};

export const getServiceStatusColor = (status: string) => {
  if (status === ServiceStatus.Active) {
    return "success.main";
  } else if (status === ServiceStatus.Inactive) {
    return "text.secondary";
  }
  return "text.primary";
};
