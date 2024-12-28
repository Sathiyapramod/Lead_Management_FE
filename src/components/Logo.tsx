import React from "react";

interface AppLogo {
    src: string;
}

function Logo({ src }: AppLogo) {
    return <img src={src} alt="avatar" width={150} height={150} />;
}

export default Logo;
