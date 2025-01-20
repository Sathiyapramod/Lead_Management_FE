import React from "react";

const Landing = React.lazy(() => import("../pages/LandingPage/LandingPage"));

const AuthRoutes = {
    path: "/",
    element: <Landing />,
};

export default AuthRoutes;
