import { useState } from "react";

export default function useCharStyles() {
  const [styles, setStles] = useState({
    Waldo: {
      check: "hidden",
      wrong: "hidden",
      box: "",
    },
    Wenda: {
      check: "hidden",
      wrong: "hidden",
      box: "",
    },
    Wizard: {
      check: "hidden",
      wrong: "hidden",
      box: "",
    },
    Odlaw: {
      check: "hidden",
      wrong: "hidden",
      box: "",
    },
    Woof: {
      check: "hidden",
      wrong: "hidden",
      box: "",
    },
  });

  const setCharStyles = (char) => {
    setStles((prev) => ({
      ...prev,
      [char]: {
        check: "",
        wrong: "hidden",
        box: "opacity-50 outline-2 outline-green hover:outline-green",
      },
    }));
  };

  return { styles, setCharStyles };
}
