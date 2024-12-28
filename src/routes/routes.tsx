import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRouter";
import AuthRoutes from "./AuthRouter";

const router = createBrowserRouter([AuthRoutes, MainRoutes]);

export default router;
