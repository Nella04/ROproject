import React from 'react';
import '../style/pages/SplitScreen.scss'

const SplitScreen = ({ leftComponent: Left, rightComponent: Right }) => {
    return (
        <div className="split-screen">
            <div className="split-screen__panel split-screen__panel--left">
                <Left />
            </div>
            <div className="split-screen__panel split-screen__panel--right">
                <Right />
            </div>
        </div>
    );
};

export default SplitScreen;