import "./index.css";
import "materialize-css/dist/css/materialize.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { TodoListPage } from "./components/todo-list/TodoListPage";
import { AnalyticsPage } from "./components/analytics/AnalyticsPage";
import { NavigationBar } from "./components/shared/NavigationBar";
import { Routes } from "./typedefs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

const Main = () => {
  const pathname = window.location.pathname;
  const route = routes.find((route) => route.path === pathname) || routes[0];
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationBar routes={routes} currentRoute={route} />
      {route.element}
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
