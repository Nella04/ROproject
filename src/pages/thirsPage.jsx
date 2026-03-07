import React from "react";
import MatriceAffichage from "../components/secondPage/MatriceAffichage";

export default function Pageandrana() {
    const exempleDonnees = {
        depots: ["1", "2", "3", "4","5"],
        magasins: ["A", "B", "C", "D"],
        disponibilites: [18, 32, 14, 5], // Valeurs à droite
        besoins: [9, 11, 28, 6, 14],        // Valeurs en bas
        // Matrice 2D pour les coûts centraux
        couts: [
            [24, 22, 61, 49,4],
            [23, 39, 78, 28,5],
            [67, 56, 92, 24,5],
            [71, 43, 91, 67,5],
        ]
    };

    // Utilisation :
    return (
        <MatriceAffichage
            nomdepot={exempleDonnees.depots}
            nommagasin={exempleDonnees.magasins}
            dispo={exempleDonnees.disponibilites}
            besoin={exempleDonnees.besoins}
            matriceCoûts={exempleDonnees.couts}
        />
    )
};