import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "sonner";

function App(): React.ReactNode {
    return (
        <div className="font-sans">
            <Toaster richColors position="top-right" />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
