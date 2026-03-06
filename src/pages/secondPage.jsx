import React from "react";
import { useState } from "react";
import SplitScreen from "../components/SplitScreen";
import LeftPanel from "../components/secondPage/LeftPanel";
import RightPanel from "../components/secondPage/RightPanel";
import '../style/pages/secondPage.scss';

export default function secondPage() {
    const [isCalculed, setIsCalculed] = useState(false);

    const toggleCalculate = () => {
        setIsCalculed(!isCalculed);
    };
    return (
        <div className={`home-page ${isCalculed ? "is-active" : ""}`}>
            <SplitScreen
                leftComponent={() => <LeftPanel onAction={toggleCalculate} isCalculed={isCalculed} />}
                rightComponent={RightPanel}
                isCalculed={isCalculed}
            />
        </div>
    );
}