import { useState } from "react";

export default function useFilters({ content }) {
  const [filters, setFilters] = useState({
    content: "all",
  });

  const contentFiltered = () => {
    return content.filter((estudioFiltrado) => {
      return (
        filters.content === "all" ||
        estudioFiltrado.nombre.toLowerCase().includes(filters.content) ||
        estudioFiltrado.email.includes(filters.content)
      );
    });
  };

  const handleOnChangeName = (e) => {
    const value = e.target.value;
    const newFilters = { ...filters, content: value.toLowerCase() };
    setFilters(newFilters);
  };

  return {
    contentFiltered,
    handleOnChangeName,
    filters,
  };
}
