import React from "react";
import { useState } from "react";
import SplitScreen from "../components/SplitScreen";
import LeftPanel from "../components/secondPage/LeftPanel";
import RightPanel from "../components/secondPage/RightPanel";
import '../style/pages/secondPage.scss';

export default function secondPage() {
    const [isCalculed, setIsCalculed] = useState(false);

    // États déplacés ici pour persistance
    const [configData, setConfigData] = useState({
        depots: [{ id: Date.now(), nom: "" }],
        magasins: [{ id: Date.now() + 1, nom: "" }],
        matrice: [[""]],
        offres: {},
        demandes: {}
    });

    const handleAction = (newData) => {
        setConfigData(prev => ({ ...prev, ...newData }));
        setIsCalculed(!isCalculed);
    };

    return (
        <div className={`home-page ${isCalculed ? "is-active" : ""}`}>
            <SplitScreen
                // On passe les données et la fonction de mise à jour
                leftComponent={
                    <LeftPanel
                        onAction={handleAction}
                        isCalculed={isCalculed}
                        data={configData}
                        setData={setConfigData}
                    />
                }
                // On passe les données au RightPanel pour l'affichage
                rightComponent={
                    isCalculed ? <RightPanel data={configData} /> : null
                }
                isCalculed={isCalculed}
            />
        </div>
    );
}