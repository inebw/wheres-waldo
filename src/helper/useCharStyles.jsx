import { useState } from "react";

export default function useCharStyles() {
  const [styles, setStles] = useState({
    Waldo: {
      check: "hidden",
      wrong: "",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Wenda: {
      check: "hidden",
      wrong: "",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Wizard: {
      check: "hidden",
      wrong: "",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Odlaw: {
      check: "hidden",
      wrong: "",
      box: "",
      status: "Not Found",
      statusClass: "",
    },
    Woof: {
      check: "hidden",
      wrong: "",
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
        box: "outline-2 outline-green hover:outline-green",
        status: "Found",
        statusClass: "bg-green text-light",
      },
    };
    setStles(newStyle);
  };

  const resetCharStyles = () => {
    setStles({
      Waldo: {
        check: "hidden",
        wrong: "",
        box: "",
        status: "Not Found",
        statusClass: "",
      },
      Wenda: {
        check: "hidden",
        wrong: "",
        box: "",
        status: "Not Found",
        statusClass: "",
      },
      Wizard: {
        check: "hidden",
        wrong: "",
        box: "",
        status: "Not Found",
        statusClass: "",
      },
      Odlaw: {
        check: "hidden",
        wrong: "",
        box: "",
        status: "Not Found",
        statusClass: "",
      },
      Woof: {
        check: "hidden",
        wrong: "",
        box: "",
        status: "Not Found",
        statusClass: "",
      },
    });
  };

  return { styles, setCharStyles, resetCharStyles };
}
