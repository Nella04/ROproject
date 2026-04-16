import React, { useEffect } from 'react';
import DynamicInputList from './DynamicInputList';
import '../../style/components/secondPage/LeftPanel.scss';
import { useState } from 'react';

const LeftPanel = ({ onAction, isCalculed, data, setData }) => {
    // Extraction des données provenant du parent
    const { depots, magasins, matrice, offres, demandes } = data;

    const [error, setError] = useState("");

    // --- Fonctions de mise à jour via setData ---
    const setDepots = (newDepots) => setData(prev => ({ ...prev, depots: newDepots }));
    const setMagasins = (newMagasins) => setData(prev => ({ ...prev, magasins: newMagasins }));

    // --- Dans LeftPanel.jsx ---

    useEffect(() => {
        // 1. Synchronisation des dépôts avec noms par défaut (A, B, C...)
        const updatedDepots = depots.map((d, i) => ({
            ...d,
            // Si le nom est vide, on génère le nom par défaut pour qu'il soit présent dans data
            nomFinal: d.nom.trim() !== "" ? d.nom : String.fromCharCode(65 + (i % 26))
        }));

        // 2. Synchronisation des magasins avec noms par défaut (1, 2, 3...)
        const updatedMagasins = magasins.map((m, i) => ({
            ...m,
            nomFinal: m.nom.trim() !== "" ? m.nom : (i + 1).toString()
        }));

        // 3. Matrice (identique à avant)
        const newMatrice = depots.map((_, r) =>
            magasins.map((_, c) => matrice[r]?.[c] || "")
        );

        // 4. Offres et Demandes (identique)
        const newOffres = { ...offres };
        depots.forEach(d => { if (newOffres[d.id] === undefined) newOffres[d.id] = ""; });

        const newDemandes = { ...demandes };
        magasins.forEach(m => { if (newDemandes[m.id] === undefined) newDemandes[m.id] = ""; });

        // Comparaison pour éviter les boucles infinies
        const hasChanged =
            JSON.stringify(newMatrice) !== JSON.stringify(matrice) ||
            JSON.stringify(updatedDepots) !== JSON.stringify(depots) || // Vérifie si les noms finaux ont changé
            JSON.stringify(updatedMagasins) !== JSON.stringify(magasins);

        if (hasChanged) {
            setData(prev => ({
                ...prev,
                depots: updatedDepots,
                magasins: updatedMagasins,
                matrice: newMatrice,
                offres: newOffres,
                demandes: newDemandes
            }));
        }
    }, [depots.length, magasins.length]);

    // --- Synchronisation de la matrice et des champs Offre/Demande ---
    useEffect(() => {
        // 1. Synchronisation de la matrice (2D)
        const newMatrice = depots.map((_, r) =>
            magasins.map((_, c) => matrice[r]?.[c] || "")
        );

        // 2. Synchronisation des offres (clé = id du dépôt)
        const newOffres = { ...offres };
        depots.forEach(d => {
            if (newOffres[d.id] === undefined) newOffres[d.id] = "";
        });

        // 3. Synchronisation des demandes (clé = id du magasin)
        const newDemandes = { ...demandes };
        magasins.forEach(m => {
            if (newDemandes[m.id] === undefined) newDemandes[m.id] = "";
        });

        // Mise à jour globale si changement détecté
        const hasChanged =
            JSON.stringify(newMatrice) !== JSON.stringify(matrice) ||
            Object.keys(newOffres).length !== Object.keys(offres).length ||
            Object.keys(newDemandes).length !== Object.keys(demandes).length;

        if (hasChanged) {
            setData(prev => ({
                ...prev,
                matrice: newMatrice,
                offres: newOffres,
                demandes: newDemandes
            }));
        }
    }, [depots, magasins, setData]); // Dépendances : change quand les listes changent

    // --- Handlers pour les inputs du tableau ---
    const handleCellChange = (r, c, val) => {
        const newMatrice = [...matrice];
        newMatrice[r][c] = val;
        setData(prev => ({ ...prev, matrice: newMatrice }));
    };

    const handleOffreChange = (id, val) => {
        setData(prev => ({
            ...prev,
            offres: { ...prev.offres, [id]: val }
        }));
    };

    const handleDemandeChange = (id, val) => {
        setData(prev => ({
            ...prev,
            demandes: { ...prev.demandes, [id]: val }
        }));
    };


const validerDonnees = () => {
    // Vérifier nombre minimum
    if (depots.length < 2) {
        return "Il faut au moins 2 dépôts.";
    }

    if (magasins.length < 2) {
        return "Il faut au moins 2 magasins.";
    }

    // Somme des offres (disponibilités)
    const sommeOffres = Object.values(offres)
        .reduce((sum, val) => sum + Number(val || 0), 0);

    // Somme des demandes (besoins)
    const sommeDemandes = Object.values(demandes)
        .reduce((sum, val) => sum + Number(val || 0), 0);

    if((sommeOffres== 0)||(sommeDemandes==0)){
        return`offres et demande requis`
    }

    if (sommeOffres !== sommeDemandes) {
        const diff = Math.abs(sommeOffres - sommeDemandes);

        if (sommeOffres < sommeDemandes) {
            return `Offres insuffisantes. Il manque ${diff}.`;
        } else {
            return `Demandes insuffisantes. Excès de ${diff}.`;
        }
    }

    return null; // valide
};

    return (
        <div className="left-panel">
            <h2>Configuration</h2>

            <div className="inputs-container">
                <DynamicInputList
                    title="magasin de vente"
                    type="alphabet"
                    items={depots}
                    setItems={setDepots}
                />
                <div className="vertical-separator"></div>
                <DynamicInputList
                    title="Magasin de depot"
                    type="nombre"
                    items={magasins}
                    setItems={setMagasins}
                />
            </div>

            <h3 className="table-title">Matrice des Coûts et Quantités</h3>
            <div className="table-wrapper">
                <table className="transport-table">
                    <thead>
                        <tr>
                            <th>Ref</th>
                            {magasins.map((m, i) => (
                                <th key={m.id}>{m.nom || (i + 1)}</th>
                            ))}
                            <th className="txt-red">Dispo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {depots.map((d, r) => (
                            <tr key={d.id}>
                                <td className="font-bold">{d.nom || String.fromCharCode(65 + r)}</td>
                                {magasins.map((m, c) => (
                                    <td key={m.id}>
                                        <input
                                            type="number"
                                            defaultValue={0}
                                            value={matrice[r]?.[c] || ""}
                                            onChange={(e) => handleCellChange(r, c, e.target.value)}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <input
                                        className="txt-red font-bold"
                                        type="number"
                                        defaultValue={0}
                                        value={offres[d.id] || ""}
                                        onChange={(e) => handleOffreChange(d.id, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="txt-red font-bold">Besoin</td>
                            {magasins.map((m) => (
                                <td key={m.id}>
                                    <input
                                        className="txt-red font-bold"
                                        type="number"
                                        defaultValue={0}
                                        value={demandes[m.id] || ""}
                                        onChange={(e) => handleDemandeChange(m.id, e.target.value)}
                                    />
                                </td>
                            ))}
                            <td className="bg-gray">Σ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="footer-actions">
                {error && (
    <div className="error-box">
        {error}
    </div>
)}
                <button
                    className="bouton-btn bouton-btn-primary"
                    onClick={() => {
                        const erreur = validerDonnees(data);

                        if (erreur) {
                            setError(erreur); // afficher erreur
                            return; // STOP → empêche calcul
                        }

                        setError(""); // reset erreur
                        onAction(data); // OK → lancer calcul
                    }}
                >
                    {isCalculed ? "Modifier" : "Calculer"}
                </button>
            </div>
        </div>
    );
};

export default LeftPanel;
