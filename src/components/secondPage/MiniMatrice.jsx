import React from 'react';
import '../../style/components/thirsPage/miniMatrice.scss';

const MiniMatrice = ({ matrice, highlights = [] }) => {
    // Gestion des valeurs simples (non-tableau)
    if (!Array.isArray(matrice)) {
        // Vérifier s'il y a un highlight pour cette cellule (position [0,0] implicite)
        const hasHighlight = highlights.some(h => h.pos[0] === 0 && h.pos[1] === 0);
        const bgColor = hasHighlight 
            ? (highlights.find(h => h.pos[0] === 0 && h.pos[1] === 0)?.color || 'orange') 
            : 'transparent';
        
        return (
            <span style={{ backgroundColor: bgColor, display: 'inline-block', padding: '2px' }}>
                {matrice}
            </span>
        );
    }

    // Si c'est un tableau 1D, on le transforme en 2D pour l'uniformité
    const rows = Array.isArray(matrice[0]) ? matrice : [matrice];

    return (
        <table className="mini-matrice">
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={`r-${rowIndex}`}>
                        {row.map((cell, colIndex) => {
                            const highLight = highlights.find(
                                (h) => h.pos[0] === rowIndex && h.pos[1] === colIndex
                            );

                            const bgColor = highLight 
                                ? (highLight.color || 'orange') 
                                : 'transparent';

                            return (
                                <td 
                                    key={`c-${colIndex}`} 
                                    style={{ backgroundColor: bgColor }}
                                    className="mini-cell"
                                >
                                    {cell}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MiniMatrice;