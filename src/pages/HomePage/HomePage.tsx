import React from "react";
import Card from "../../components/Card";

function HomePage(): React.ReactNode {
    return (
        <div className="p-[55px]">
            <div className="flex justify-start items-center gap-[35px]">
                <Card
                    title={"Orders"}
                    count={20}
                    active={10}
                    pending={10}
                    activeTag="Closed"
                    pendingTag="Pending"
                />
                <Card
                    title={"Leads"}
                    count={45}
                    active={20}
                    pending={15}
                    activeTag="Active"
                    pendingTag="Closed"
                />
            </div>
        </div>
    );
}

export default HomePage;
