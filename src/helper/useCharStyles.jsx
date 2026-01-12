import { useState } from "react";

export default function useCharStyles() {
  const [styles, setStles] = useState({
    Waldo: {
      check: "hidden",
      wrong: "hidden",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Wenda: {
      check: "hidden",
      wrong: "hidden",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Wizard: {
      check: "hidden",
      wrong: "hidden",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Odlaw: {
      check: "hidden",
      wrong: "hidden",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Woof: {
      check: "hidden",
      wrong: "hidden",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
  });

  const setCharStyles = (char) => {
    const newStyle = {
      ...styles,
      [char]: {
        check: "",
        wrong: "hidden",
        box: "opacity-50 outline-2 outline-green hover:outline-green",
        status: "Found",
        statusClass: "bg-green text-light",
      },
    };
    setStles(newStyle);
  };

  return { styles, setCharStyles };
}
