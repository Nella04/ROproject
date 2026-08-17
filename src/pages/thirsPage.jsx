import React, { useEffect, useState } from "react";
import MatriceAffichage from "../components/secondPage/MatriceAffichage";
//import finding from "../utils/finding";
import finding from "../service/finding";
import { useMemo } from "react";

export default function Pageandrana({ exempleDonnees, setSolutionBase }) {
    if (!exempleDonnees || !exempleDonnees.couts || exempleDonnees.couts.length === 0) {
        return <div>Aucune donnée à afficher</div>;
    }

    const [existespilone, setEsistEpsilone] = useState(false);
    const [nombreArc, setNombreArc] = useState(0);

    const etapes = useMemo(() => {
        return finding.solveTransport(exempleDonnees);
    }, [exempleDonnees]);

    useEffect(() => {
        if (etapes.length > 0) {
            setSolutionBase(etapes[etapes.length - 1]);
        }

        const m = exempleDonnees.disponibilites.length;
        const n = exempleDonnees.besoins.length;
        setNombreArc( m + n - 1 );

        if (etapes.length !== (m + n - 1)) {
            setEsistEpsilone(true);
        } else {
            setEsistEpsilone(false);
        }

    }, [etapes]);
    // console.log("resulata de la solution de base", etapes);
    // console.log("epsilone",existespilone);

    const [stepIndex, setStepIndex] = useState(0);

    const totalSteps = etapes.length * 3;

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight" || e.key === "Enter") {
                // Avancer d'une phase
                setStepIndex(prev =>
                    prev < totalSteps - 1 ? prev + 1 : prev
                );
            }
            else if (e.key === "ArrowLeft") {
                // Revenir d'une phase
                setStepIndex(prev =>
                    prev > 0 ? prev - 1 : prev
                );
            }
            else if (e.key === "ArrowDown") {
                // Optionnel : Avancer d'une itération complète (3 phases d'un coup)
                setStepIndex(prev => {
                    const nextIteration = prev + 3;
                    return nextIteration < totalSteps ? nextIteration : prev;
                });
            }
            else if (e.key === "ArrowUp") {
                // Optionnel : Reculer d'une itération complète (3 phases d'un coup)
                setStepIndex(prev => {
                    const prevIteration = prev - 3;
                    return prevIteration >= 0 ? prevIteration : 0;
                });
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [totalSteps]);

    const currentIteration = Math.floor(stepIndex / 3);
    const phase = stepIndex % 3;

    const currentData = etapes[currentIteration] || etapes[0];
    let activeCell = null;

    if (currentData?.minitabmat?.length > 0) {
        const currentMini = currentData.minitabmat[currentIteration];
        if (currentMini) {
            activeCell = currentMini.position;
        }
    }
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

    // 🔥 récupérer toutes les cellules vertes
    const allGreenCells = [];

    for (let i = 0; i <= currentIteration; i++) {
        if (!etapes[i]) continue;

        etapes[i].minitabmat.forEach(item => {
            allGreenCells.push({
                row: item.position.row,
                col: item.position.col
            });
        });
    }

    // 🔲 appliquer blocage
    for (let i = 0; i <= currentIteration; i++) {

        if (!etapes[i]) continue;

        etapes[i].bloque.forEach(pos => {

            // // ❌ ignorer toutes les cellules vertes
            // const isGreenCell = allGreenCells.some(
            //     c => c.row === pos.row && c.col === pos.col
            // );

            // if (isGreenCell) return;

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

    const matriceSolution = useMemo(() => {

        const rows = exempleDonnees.couts.length;
        const cols = exempleDonnees.couts[0].length;

        // matrice vide
        const matrice = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => "0")
        );

        if (!currentData?.minitabmat) return matrice;

        currentData.minitabmat.forEach((item, index) => {

            const { row, col } = item.position;

            // Phase 0 → juste coloré (pas de valeur)
            if (index === currentIteration && phase === 0) {
                matrice[row][col] = "";
            }

            // Phase 1 → afficher valeur
            else if (index === currentIteration && phase >= 1) {
                matrice[row][col] = item.nombre;
            }

            // Anciennes étapes → toujours affichées
            else if (index < currentIteration) {
                matrice[row][col] = item.nombre;
            }

        });

        return matrice;

    }, [currentData, currentIteration, phase, exempleDonnees]);

    let solutionHighlights = [];

    // cellule actuelle (vert)
    if (currentData?.minitabmat?.length > 0) {
        const currentMini = currentData.minitabmat[currentIteration];

        if (currentMini) {
            solutionHighlights.push({
                mainPos: [currentMini.position.row, currentMini.position.col],
                subPos: [0, 0],
                color: "#09c294"
            });
        }
    }

    let solutionBlocked = [];

    for (let i = 0; i <= currentIteration; i++) {
        if (!etapes[i]) continue;

        etapes[i].bloque.forEach(pos => {

            const isGreenCell = allGreenCells.some(
                c => c.row === pos.row && c.col === pos.col
            );

            if (isGreenCell) {
                solutionBlocked.push({
                mainPos: [pos.row, pos.col],
                subPos: [0, 0],
                color: "bleu"
            });
            };

            solutionBlocked.push({
                mainPos: [pos.row, pos.col],
                subPos: [0, 0],
                color: "black"
            });
        });
    }

    return (
        <>
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

            <h3 className="table-title">solution de base</h3>

            <MatriceAffichage
                nomdepot={currentData.depots}
                nommagasin={currentData.magasins}
                dispo={currentData.disponibilites}
                besoin={currentData.besoins}
                matriceCoûts={matriceSolution} // 👈 ICI LA MAGIE
                highlightsCouts={[...solutionHighlights, ...solutionBlocked]}
                highlightDispo={dispoHighlight}
                highlightBesoin={besoinHighlight}
            />
        </>
    );
}