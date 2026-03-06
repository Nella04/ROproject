import React from 'react';
import '../../style/components/secondPage/RightPanel.scss'

const RightPanel = () => {
    return (
        <div className="right-panel">
            <h2>Partie Droite</h2>
            <p>Contenu de la partie droite de l'écran</p>
            <input
                type="text"
                placeholder="Saisissez du texte..."
                className="right-panel__input"
            />
        </div>
    );
};

export default RightPanel;