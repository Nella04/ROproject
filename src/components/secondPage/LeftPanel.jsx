import React from 'react';
import '../../style/components/secondPage/LeftPanel.scss'

const LeftPanel = ({ onAction, isCalculed }) => {
    return (
        <div className="left-panel">
            <h2>Partie Gauche</h2>
            <p>Remplissez les informations avant de calculer.</p>
            <button className="bouton-btn bouton-btn-primary" onClick={onAction}>
                {isCalculed ? "Modifier" : "Calculer"}
            </button>
        </div>
    );
};

export default LeftPanel;