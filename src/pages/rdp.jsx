import "../style/pages/rdp.css";

import Message from "../components/rdp/message";
import Image from "../components/rdp/image";
import Matrice from "../components/rdp/matrice";

function Rdp() {
    // 1. Marquage initial M0 (P1 à P9)
    const marquageInitial = {
        P1: 7,
        P2: 5,
        P3: 0,
        P4: 0,
        P5: 1,
        P6: 0,
        P7: 0,
        P8: 1,
        P9: 0
    };

    // 2. Matrice PRE (Place -> Transition)
    const pre = {
        P1: { T1: 1, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 },
        P2: { T1: 1, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 },
        P3: { T1: 0, T2: 1, T3: 1, T4: 0, T5: 0, T6: 0 },
        P4: { T1: 0, T2: 0, T3: 0, T4: 1, T5: 0, T6: 0 },
        P5: { T1: 0, T2: 0, T3: 0, T4: 1, T5: 0, T6: 0 },
        P6: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 1, T6: 0 },
        P7: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 1 },
        P8: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 1 },
        P9: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 },
    };

    // 3. Matrice POST (Transition -> Place)
    const post = {
        P1: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 },
        P2: { T1: 0, T2: 1, T3: 0, T4: 0, T5: 1, T6: 0 },
        P3: { T1: 1, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 },
        P4: { T1: 0, T2: 0, T3: 1, T4: 0, T5: 0, T6: 0 },
        P5: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 1, T6: 0 },
        P6: { T1: 0, T2: 0, T3: 0, T4: 1, T5: 0, T6: 0 },
        P7: { T1: 0, T2: 1, T3: 0, T4: 0, T5: 1, T6: 0 },
        P8: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 1 },
        P9: { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 1 },
    };

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
            <section className="rdp-message">
                <Message message={donnees.message} somme={somme} />
            </section>

            <section className="rdp-bottom">
                <div className="rdp-image">
                    <Image
                        marquageInitial={marquageInitial}
                        pre={pre}
                        post={post}
                    />
                </div>

                <div className="rdp-matrice">
                    <Matrice matrice={donnees.matrice} somme={somme} />
                </div>
            </section>
        </main>
    );
}

export default Rdp;