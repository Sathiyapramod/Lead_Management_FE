import { createBrowserRouter } from "react-router-dom";

import AuthRoutes from "./AuthRouter";
import MainRoutes from "./MainRouter";

const router = createBrowserRouter([AuthRoutes, MainRoutes]);

export default router;
