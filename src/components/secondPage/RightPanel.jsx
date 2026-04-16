import React, { useEffect, useState } from 'react';
import '../../style/components/secondPage/RightPanel.scss';
import transformerDonnees from '../../service/util';
import Pageandrana from '../../pages/thirsPage';
import { useMemo } from 'react';

const RightPanel = ({ data }) => {
    const datanew = useMemo(() => {
        return transformerDonnees(data);
    }, [data]);
    const [solutionBase, setSolutionBase] = useState();
    useEffect(() => {
        console.log("dddd", solutionBase);
    }, [solutionBase]);
    return (
        <Pageandrana exempleDonnees={datanew} setSolutionBase={setSolutionBase} />
    );
};

export default RightPanel;