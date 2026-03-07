import React, { useEffect } from 'react';
import DynamicInputList from './DynamicInputList';
import '../../style/components/secondPage/LeftPanel.scss';

const LeftPanel = ({ onAction, isCalculed, data, setData }) => {
    // Extraction des données provenant du parent
    const { depots, magasins, matrice, offres, demandes } = data;

    // --- Fonctions de mise à jour via setData ---
    const setDepots = (newDepots) => setData(prev => ({ ...prev, depots: newDepots }));
    const setMagasins = (newMagasins) => setData(prev => ({ ...prev, magasins: newMagasins }));

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

    return (
        <div className="left-panel">
            <h2>Configuration</h2>
            
            <div className="inputs-container">
                <DynamicInputList 
                    title="Dépôts" 
                    type="alphabet" 
                    items={depots}
                    setItems={setDepots} 
                />
                <div className="vertical-separator"></div>
                <DynamicInputList 
                    title="Magasins" 
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
                                            value={matrice[r]?.[c] || ""} 
                                            onChange={(e) => handleCellChange(r, c, e.target.value)}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <input 
                                        className="txt-red font-bold"
                                        type="number" 
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
                <button 
                    className="bouton-btn bouton-btn-primary" 
                    onClick={() => {
                        console.log("data",data);
                        onAction(data);
                        }
                    }
                >
                    {isCalculed ? "Modifier" : "Calculer"}
                </button>
            </div>
        </div>
    );
};

export default LeftPanel;