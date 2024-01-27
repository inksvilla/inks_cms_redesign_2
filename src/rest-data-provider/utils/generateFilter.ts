import { CrudFilters } from "@refinedev/core";
import { mapOperator } from "./mapOperator";

export const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
    filters.map((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        throw new Error(
          `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`
        );
      }

      if ("field" in filter) {
        const { field, operator, value } = filter;

        if (field === "q") {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);
        if (mappedOperator) {
          queryFilters[`${field}[${mappedOperator}]`] = value; // ratings[gte]=3
        } else if (operator === "contains") {
          queryFilters[`${field}[regex]`] = value; // name[regex]=Barry
          queryFilters[`${field}[options]`] = "i"; // name[options]=i
        } else {
          queryFilters[`${field}`] = value; // name=Barry
        }
      }
    });
  }

  return queryFilters;
};
