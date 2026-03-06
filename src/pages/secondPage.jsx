import React, { useState } from "react";
import SplitScreen from "../components/SplitScreen";
import LeftPanel from "../components/secondPage/LeftPanel";
import RightPanel from "../components/secondPage/RightPanel";
import '../style/pages/secondPage.scss';

export default function SecondPage() {
    const [isCalculed, setIsCalculed] = useState(false);

    // Données structurées
    const [depots, setDepots] = useState([{ id: 1, name: "A", stock: 0 }]);
    const [magasins, setMagasins] = useState([{ id: 1, name: "1", demand: 0 }]);
    const [costs, setCosts] = useState({}); // Format: { "depotId-magasinId": valeur }

    const toggleCalculate = () => {
        if (!isCalculed) {
            // Ici, on pourrait appeler un service de calcul
            console.log("Données envoyées au service :", { depots, magasins, costs });
        }
        setIsCalculed(!isCalculed);
    };

    return (
        <div className={`home-page ${isCalculed ? "is-active" : ""}`}>
            <SplitScreen
                leftComponent={() => (
                    <LeftPanel
                        onAction={toggleCalculate}
                        isCalculed={isCalculed}
                        depots={depots} setDepots={setDepots}
                        magasins={magasins} setMagasins={setMagasins}
                        costs={costs} setCosts={setCosts}
                    />
                )}
                rightComponent={() => (
                    <RightPanel depots={depots} magasins={magasins} costs={costs} />
                )}
                isCalculed={isCalculed}
            />
        </div>
    );
}