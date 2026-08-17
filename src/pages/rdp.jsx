import "../style/pages/rdp.css";

import Message from "../components/rdp/message";
import Image from "../components/rdp/image";
import Matrice from "../components/rdp/matrice";

function Rdp() {

    const donnees = {
        titre: "RDP",
        message: "Bienvenue dans le système",
        matrice: [
            [10, 20, 30],
            [40, 50, 60],
            [70, 80, 90],
        ],
    };
 
    const calculerSomme = (matrice) => {
        return matrice.flat().reduce((total, valeur) => total + valeur, 0);
    };

    const somme = calculerSomme(donnees.matrice);

    return (
        <main className="rdp">
            {/* Partie supérieure : 30% */}
            <section className="rdp-message">
                <Message
                    message={donnees.message}
                    somme={somme}
                />
            </section>

            {/* Partie inférieure : 70% */}
            <section className="rdp-bottom">
                {/* Gauche : 60% */}
                <div className="rdp-image">
                    <Image
                        matrice={donnees.matrice}
                        somme={somme}
                    />
                </div>

                {/* Droite : 40% */}
                <div className="rdp-matrice">
                    <Matrice
                        matrice={donnees.matrice}
                        somme={somme}
                    />
                </div>
            </section>
        </main>
    );
}

export default Rdp;