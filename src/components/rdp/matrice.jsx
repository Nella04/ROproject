import "../../style/components/rdp/matrice.css";

function Matrice({ matrice, somme }) {
    return (
        <div className="matrice">
            <h2>Matrice</h2>

         

            <p>
                Somme : <strong>{somme}</strong>
            </p>
        </div>
    );
}

export default Matrice;