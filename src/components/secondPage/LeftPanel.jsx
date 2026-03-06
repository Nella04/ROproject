import React from 'react';
import '../../style/components/secondPage/LeftPanel.scss'

const LeftPanel = () => {
    return (
        <div className="left-panel">
            <h2>Partie Gauche</h2>
            <p>Contenu de la partie gauche de l'écran</p>
            <button className="left-panel__button">Bouton gauche</button>
        </div>
    );
};

export default LeftPanel;