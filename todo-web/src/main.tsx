import "./index.css";
import "materialize-css/dist/css/materialize.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { TodoListPage } from "./components/TodoListPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { NavigationBar } from "./components/NavigationBar";
import { Routes } from "./typedefs";

const routes: Routes = [
  {
    path: "/",
    title: "Todo List",
    element: <TodoListPage />,
  },
  {
    path: "/analytics",
    title: "Analytics",
    element: <AnalyticsPage />,
  },
];

const Main = () => {
  const pathname = window.location.pathname;
  const route = routes.find((route) => route.path === pathname) || routes[0];
  return (
    <>
      <NavigationBar routes={routes} currentRoute={route} />
      {route.element}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
