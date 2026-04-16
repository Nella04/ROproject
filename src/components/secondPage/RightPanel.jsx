import React from 'react';
import '../../style/components/secondPage/RightPanel.scss';
import transformerDonnees from '../../service/util';
import Pageandrana from '../../pages/thirsPage';

const RightPanel = ({ data }) => {
    const datanew = transformerDonnees(data);
    console.log("hszhfri",datanew);
    return (
        <Pageandrana exempleDonnees={datanew}/>
    );
};

export default RightPanel;