import { Children } from "react";
import App from "./App";
import Start from "./components/Start";
import Choose from "./components/Choose";
import Game from "./components/Game";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "start/:id",
        element: <Start />,
      },
      {
        index: true,
        element: <Choose />,
      },
      {
        path: "game/:id",
        element: <Game />,
      },
    ],
  },
];

export default routes;
