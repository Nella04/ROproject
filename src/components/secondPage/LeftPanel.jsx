import React from 'react';

const LeftPanel = ({ onAction, isCalculed, depots, setDepots, magasins, setMagasins, costs, setCosts }) => {

    // Gestion de la synchronisation Nombre <-> Liste
    const handleNumberChange = (value, list, setList, type) => {
        const num = Math.max(1, parseInt(value) || 1);
        if (num > list.length) {
            // Ajouter des champs
            const newFields = [...list];
            for (let i = list.length; i < num; i++) {
                newFields.push({ 
                    id: Date.now() + i, 
                    name: type === 'depot' ? String.fromCharCode(65 + i) : `${i + 1}`, 
                    val: 0 
                });
            }
            setList(newFields);
        } else if (num < list.length) {
            // Supprimer uniquement si le dernier est vide ou forcé
            const lastItem = list[list.length - 1];
            if (!lastItem.name || window.confirm("Le dernier champ est rempli, supprimer quand même ?")) {
                setList(list.slice(0, num));
            }
        }
    };

    const updateCost = (dId, mId, val) => {
        setCosts(prev => ({ ...prev, [`${dId}-${mId}`]: val }));
    };

    return (
        <div className="left-panel">
            <h2>Configuration</h2>
            
            <section>
                <h3>Dépôts (Lignes)</h3>
                <input type="number" value={depots.length} onChange={(e) => handleNumberChange(e.target.value, depots, setDepots, 'depot')} />
                {depots.map((d, idx) => (
                    <div key={d.id} className="input-group">
                        <input value={d.name} onChange={(e) => {
                            const nd = [...depots]; nd[idx].name = e.target.value; setDepots(nd);
                        }} placeholder="Nom du dépôt" required />
                        <input type="number" placeholder="Disponibilité" onChange={(e) => {
                            const nd = [...depots]; nd[idx].stock = e.target.value; setDepots(nd);
                        }} />
                    </div>
                ))}
            </section>

            <section>
                <h3>Magasins (Colonnes)</h3>
                <input type="number" value={magasins.length} onChange={(e) => handleNumberChange(e.target.value, magasins, setMagasins, 'magasin')} />
                {magasins.map((m, idx) => (
                    <input key={m.id} value={m.name} onChange={(e) => {
                        const nm = [...magasins]; nm[idx].name = e.target.value; setMagasins(nm);
                    }} />
                ))}
            </section>

            {/* Matrice de saisie des coûts */}
            <table className="matrix-input">
                <thead>
                    <tr>
                        <th></th>
                        {magasins.map(m => <th key={m.id}>{m.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {depots.map(d => (
                        <tr key={d.id}>
                            <td><strong>{d.name}</strong></td>
                            {magasins.map(m => (
                                <td key={m.id}>
                                    <input type="number" onChange={(e) => updateCost(d.id, m.id, e.target.value)} />
                                </td>
                            ))}
                        </tr>))}
                    </tbody>
                </table>

            <button className="bouton-btn-primary" onClick={onAction}>
                {isCalculed ? "Modifier" : "Calculer"}
            </button>
        </div>
    );
};

export default LeftPanel;