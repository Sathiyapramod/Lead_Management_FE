import React, { useEffect, useState } from "react";
import Login from "../../components/custom/Landing/Login";
import slide1 from "../../assets/slide1.avif";
import slide2 from "../../assets/slide2.avif";
import slide3 from "../../assets/slide3.avif";

function LandingPage(): React.ReactNode {
    const slideShow = [slide1, slide2, slide3];

    const [currIdx, setCurrIdx] = useState<number>(0);

    useEffect(() => {
        const changeIdx = setInterval(() => {
            setCurrIdx((pv) => (pv + 1) % slideShow.length);
        }, 5000);

        return () => clearInterval(changeIdx);
    }, [slideShow.length]);

    return (
        <div className="flex flex-row justify-center items-center mx-auto border h-screen">
            <div
                className="flex-1 h-full transition-all duration-600 ease-in max-lg:opacity-80"
                style={{
                    backgroundImage: `url(${slideShow[currIdx]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectFit: "cover",
                }}
            ></div>
            <div className="flex-1">
                <Login />
            </div>
        </div>
    );
}

export default LandingPage;
