import React from "react";
import MatriceAffichage from "../components/secondPage/MatriceAffichage";
import finding from "../service/finding";

export default function Pageandrana() {
    const exempleDonnees = {
        depots: ["1", "2", "3", "4", "5"],
        magasins: ["A", "B", "C", "D"],
        disponibilites: [18, 5, 14, 5], // Valeurs à droite
        besoins: [8, 11, 28, 6, 14],        // Valeurs en bas
        // Matrice 2D pour les coûts centraux
        couts: [
            [24, 22, 61, 49, 4],
            [23, 39, 78, 28, 5],
            [67, 56, 92, 24, 5],
            [71, 43, 91, 67, 5],
        ],
        minitabmat :[], //{//pour le position de amoin et ca valeur
            // {
            //     position:1,
            //     nombre:2,
            // }
        //},
        bloque:[[]],
        
    };
    //colorMatrice:[[]]

    const mesHighlights = [
        // {
        //     mainPos: [0, 0], // Vise la cellule (Magasin A, Dépôt 1)
        //     subPos: [0, 0],  // Vise le deuxième élément (le "20")
        //     color: 'red'    // Couleur spécifique
        // },
    ]

    const result = finding.solveTransport(exempleDonnees);
    //console.log(result);

    const result2 = finding.solveTransport2(exempleDonnees);
    console.log(result2);
    // Utilisation :
    return (
        <MatriceAffichage
            nomdepot={exempleDonnees.depots}
            nommagasin={exempleDonnees.magasins}
            dispo={exempleDonnees.disponibilites}
            besoin={exempleDonnees.besoins}
            matriceCoûts={exempleDonnees.couts}
            highlightsCouts={mesHighlights}
        />
    )
};