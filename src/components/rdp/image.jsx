import "../../style/components/rdp/image.css";

function Image({ matrice, somme }) {
    return (
        <div className="image">
            <h2>Image</h2>

            <p>
                Nombre de lignes : {matrice.length}
            </p>

            <p>
                Somme : {somme}
            </p>
        </div>
    );
}

export default Image;