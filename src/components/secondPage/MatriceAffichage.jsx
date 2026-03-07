import React from 'react';
import '../../style/components/secondPage/MatriceAffichage.scss';

const MatriceAffichage = ({ nomdepot, nommagasin, dispo, besoin, matriceCoûts }) => {
    return (
        <div className="matrice-container">
            <table className="custom-matrice">
                <thead>
                    <tr>
                        {/* Case vide en haut à gauche */}
                        <th className="empty-cell"></th>
                        {/* En-têtes des colonnes : Noms des dépôts */}
                        {nomdepot.map((depot, index) => (
                            <th key={`h-depot-${index}`} className="header-depot">
                                {depot}
                            </th>
                        ))}
                        {/* Colonne finale pour la disponibilité */}
                        <th className="header-dispo">Disponibilité</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Lignes pour chaque magasin */}
                    {nommagasin.map((magasin, rowIndex) => (
                        <tr key={`row-magasin-${rowIndex}`}>
                            {/* Première colonne de la ligne : Nom du magasin */}
                            <td className="header-magasin">{magasin}</td>

                            {/* Cellules intérieures (Matrice de données/coûts) */}
                            {nomdepot.map((_, colIndex) => (
                                <td key={`cell-${rowIndex}-${colIndex}`} className="data-cell">
                                    {/* On affiche la valeur de la matrice si elle existe */}
                                    {matriceCoûts && matriceCoûts[rowIndex] ? matriceCoûts[rowIndex][colIndex] : '-'}
                                </td>
                            ))}

                            {/* Colonne de droite : Valeur de disponibilité (dispo) */}
                            <td className="value-dispo">{dispo[rowIndex]}</td>
                        </tr>
                    ))}

                    {/* Dernière ligne : Besoins */}
                    <tr className="footer-besoin">
                        <td className="label-besoin">Besoin</td>
                        {besoin.map((b, index) => (
                            <td key={`f-besoin-${index}`} className="value-besoin">
                                {b}
                            </td>
                        ))}
                        {/* Case vide en bas à droite ou Σ */}
                        <td className="total-cell">Σ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MatriceAffichage;