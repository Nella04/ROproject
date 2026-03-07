import React from 'react';
import '../../style/components/secondPage/RightPanel.scss'

const RightPanel = ({ data }) => {
    return (
        <div className="right-panel">
            <h2>Résultats du Calcul</h2>
            <div className="summary">
                <p>Nombre de dépôts : {data.depots.length}</p>
                <p>Nombre de magasins : {data.magasins.length}</p>
                {/* Exemple d'affichage d'une valeur de la matrice */}
                <p>Coût [A][1] : {data.matrice[0]?.[0] || 0}</p>
            </div>
        </div>
    );
};

export default RightPanel;