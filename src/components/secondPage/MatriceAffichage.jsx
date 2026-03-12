import React from 'react';
import '../../style/components/secondPage/MatriceAffichage.scss';
import MiniMatrice from './MiniMatrice'; // Importation du nouveau composant

const MatriceAffichage = ({ nomdepot, nommagasin, dispo, besoin, matriceCoûts,
    highlightsCouts = [],
    highlightDispo = null,
    highlightBesoin = null
}) => {

    // Fonction utilitaire pour le rendu des dispo/besoin (simple ou flex)
    const renderSimpleOrFlex = (data, direction = 'row') => {
        if (!Array.isArray(data)) return data;

        const containerStyle = {
            display: 'flex',
            flexDirection: direction === 'column' ? 'column' : 'row',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center'
        };

        return (
            <div style={containerStyle}>
                {data.map((item, i) => <span key={i}>{item}</span>)}
            </div>
        );
    };
    const renderSimpleOrFlexDispo = (data, direction = 'row') => {
        if (!Array.isArray(data)) return data;

        const containerStyleDisponible = {
            display: "flex",                // indispensable pour activer flex
            flexDirection: direction === 'column' ? 'column' : 'row',
            gap: "20px",                    // espace entre les items
            justifyContent: "left",
            alignItems: "left"
        };

    return (
            <div style={containerStyleDisponible}>
                {data.map((item, i) => <span key={i}>{item}</span>)}
            </div>
        );
    };

    return (
        <div className="matrice-container">
            <table className="custom-matrice">
                <thead>
                    <tr>
                        <th className="empty-cell"></th>
                        {nomdepot.map((depot, index) => (
                            <th key={`h-depot-${index}`} className="header-depot">{depot}</th>
                        ))}
                        <th className="header-dispo">Disponibilité</th>
                    </tr>
                </thead>
                <tbody>
                    {nommagasin.map((magasin, rowIndex) => (
                        <tr key={`row-magasin-${rowIndex}`}>
                            <td className="header-magasin">{magasin}</td>

                            {/* ICI : Utilisation de MiniMatrice pour les coûts */}
                            {nomdepot.map((_, colIndex) => {
                                const cellData = matriceCoûts?.[rowIndex]?.[colIndex];

                                // On filtre les highlights qui concernent CETTE cellule précise du grand tableau
                                const localHighlights = highlightsCouts
                                    .filter(h => h.mainPos[0] === rowIndex && h.mainPos[1] === colIndex)
                                    .map(h => ({ pos: h.subPos, color: h.color }));

                                return (
                                    <td key={`cell-${rowIndex}-${colIndex}`} className="data-cell">
                                        <MiniMatrice
                                            matrice={cellData}
                                            highlights={localHighlights}
                                        />
                                    </td>
                                );
                            })}

                            <td
                                className="value-dispo"
                                style={{
                                    color: highlightDispo === rowIndex ? "red" : "inherit",
                                    fontWeight: highlightDispo === rowIndex ? "bold" : "normal",
                                    textAlign: "left"
                                }}
                            >
                                {renderSimpleOrFlexDispo(dispo[rowIndex], 'row')}
                            </td>
                        </tr>
                    ))}

                    <tr className="footer-besoin">
                        <td className="label-besoin">Besoin</td>
                        {besoin.map((b, index) => (
                            <td
                                key={`f-besoin-${index}`}
                                className="value-besoin"
                                style={{
                                    color: highlightBesoin === index ? "red" : "inherit",
                                    fontWeight: highlightBesoin === index ? "bold" : "normal",
                                    verticalAlign: "top"
                                }}
                            >
                                {renderSimpleOrFlex(b, 'column')}
                            </td>
                        ))}
                        <td className="total-cell">Σ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MatriceAffichage;