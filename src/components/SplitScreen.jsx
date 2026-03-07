import React from 'react';
import '../style/pages/SplitScreen.scss'

const SplitScreen = ({ leftComponent, rightComponent, isCalculed }) => {
    return (
        <div className={`split-screen ${isCalculed ? "is-active" : ""}`}>
            <div className="split-screen__panel split-screen__panel--left">
                {leftComponent} {/* Directement l'élément, pas une fonction */}
            </div>
            <div className="split-screen__panel split-screen__panel--right">
                {rightComponent}
            </div>
        </div>
    );
};

export default SplitScreen;