import React from "react";

interface AppLogo {
    src: string;
    width: number;
    height: number;
}

function Logo({ src, width, height }: AppLogo) {
    return <img src={src} alt="avatar" width={width} height={height} />;
}

export default Logo;
