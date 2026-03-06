import React from "react";
import SplitScreen from "../components/SplitScreen";
import LeftPanel from "../components/secondPage/LeftPanel";
import RightPanel from "../components/secondPage/RightPanel";
import '../style/pages/secondPage.scss';

export default function secondPage() {
    return (
        <div className="home-page">
            <SplitScreen
                leftComponent={LeftPanel}
                rightComponent={RightPanel}
            />
        </div>
    );
}