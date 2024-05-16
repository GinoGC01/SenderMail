import { useState } from "react";

export default function useOpenComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return {
    open,
    handleOpen,
  };
}
