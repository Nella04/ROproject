import "../../style/components/rdp/matrice.css";

function Matrice({ matrice, somme }) {
    return (
        <div className="matrice">
            <h2>Matrice</h2>

            <div className="matrice-table">
                {matrice.map((ligne, indexLigne) => (
                    <div
                        className="matrice-row"
                        key={indexLigne}
                    >
                        {ligne.map((valeur, indexColonne) => (
                            <div
                                className="matrice-cell"
                                key={indexColonne}
                            >
                                {valeur}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <p>
                Somme : <strong>{somme}</strong>
            </p>
        </div>
    );
}

export default Matrice;