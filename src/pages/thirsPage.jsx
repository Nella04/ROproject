import React, { useEffect, useState } from "react";
import MatriceAffichage from "../components/secondPage/MatriceAffichage";
//import finding from "../utils/finding";
import finding from "../service/finding";

export default function Pageandrana() {

    const exempleDonnees = {
        depots: ["1", "2", "3", "4", "5","6"],
        magasins: ["A", "B", "C", "D"],
        disponibilites: [18, 32, 14, 9],
        besoins: [9, 11, 28, 6, 14, 5],
        couts: [
            [24, 22, 61, 49, 83,35],
            [23, 39, 78, 28, 65,42],
            [67, 56, 92, 24, 53,54],
            [71, 43, 91, 67, 40,49],
        ]
    };

    const etapes = finding.solveTransport(exempleDonnees);

    const [stepIndex, setStepIndex] = useState(0);

    const totalSteps = etapes.length * 3;

    useEffect(() => {

        const handleKey = (e) => {

            if (e.key === "ArrowRight" || e.key === "Enter") {
                setStepIndex(prev =>
                    prev < totalSteps - 1 ? prev + 1 : prev
                );
            }

        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);

    }, [totalSteps]);
    const currentIteration = Math.floor(stepIndex / 3);
    const phase = stepIndex % 3;

    const currentData = etapes[currentIteration] || etapes[0];
    let mesHighlights = [];

    if (phase === 0) {

        const lastMini = currentData.minitabmat[currentData.minitabmat.length - 1];

        if (lastMini) {

            mesHighlights.push({
                mainPos: [lastMini.position.row, lastMini.position.col],
                subPos: [0, 0],
                color: "#09c294"
            });

        }

    }

    let dispoHighlight = null;
    let besoinHighlight = null;

    if (phase === 1) {

        const lastMini = currentData.minitabmat[currentData.minitabmat.length - 1];

        if (lastMini) {
            dispoHighlight = lastMini.position.row;
            besoinHighlight = lastMini.position.col;
        }

    }

    let blockedCells = [];

// récupérer toutes les cellules bloquées jusqu'à l'étape actuelle
for (let i = 0; i <= currentIteration; i++) {

    if (!etapes[i]) continue;

    etapes[i].bloque.forEach(pos => {

        const alreadyExists = blockedCells.some(
            c => c.mainPos[0] === pos.row && c.mainPos[1] === pos.col
        );

        if (!alreadyExists) {
            blockedCells.push({
                mainPos: [pos.row, pos.col],
                subPos: [0, 0],
                color: "black"
            });
        }

    });

}
    return (

        <MatriceAffichage
            nomdepot={currentData.depots}
            nommagasin={currentData.magasins}
            dispo={currentData.disponibilites}
            besoin={currentData.besoins}
            matriceCoûts={currentData.couts}
            highlightsCouts={[...mesHighlights, ...blockedCells]}
            highlightDispo={dispoHighlight}
            highlightBesoin={besoinHighlight}
        />

    );
}