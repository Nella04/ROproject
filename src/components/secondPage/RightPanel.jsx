import React from 'react';
import '../../style/components/secondPage/RightPanel.scss'

const RightPanel = ({ depots, magasins, costs }) => {
    return (
        <div className="right-panel">
            <h2>Tableau des Coûts</h2>
            <table className="result-table">
                <thead>
                    <tr>
                        <th></th>
                        {magasins.map(m => <th key={m.id}>{m.name}</th>)}
                        <th className="supply-head">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {depots.map(d => (
                        <tr key={d.id}>
                            <td className="row-name">{d.name}</td>
                            {magasins.map(m => (
                                <td key={m.id} className="cell-cost">
                                    {costs[`${d.id}-${m.id}`] || 0}
                                </td>
                            ))}
                            <td className="supply-val">{d.stock}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="demand-head">Besoin</td>
                        {magasins.map(m => (
                            <td key={m.id} className="demand-val">{m.demand || 0}</td>
                        ))}
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RightPanel;