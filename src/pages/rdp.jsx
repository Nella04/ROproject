import { useState } from "react";
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

    // 3. Matrice POST (Place -> Transition)
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

    // État du Marquage Actuel
    const [marquageActuel, setMarquageActuel] = useState(marquageInitial);

    // État de la Séquence de transition (Compteur de tirs par transition)
    const [sequence, setSequence] = useState({
        T1: 0,
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0
    });

    const [derniereTransition, setDerniereTransition] = useState(null);
    
    // Reinitialiser
    const handleReset = () => {
        setMarquageActuel(marquageInitial);
        setSequence({ T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 });
        setDerniereTransition(null);
    };

    return (
        <main className="rdp">
            <section className="rdp-message">
                <Message derniereTransition={derniereTransition} />
            </section>

            <section className="rdp-bottom">
                <div className="rdp-image">
                    <Image
                        marquageInitial={marquageInitial}
                        marquageActuel={marquageActuel}
                        setMarquageActuel={setMarquageActuel}
                        sequence={sequence}
                        setSequence={setSequence}
                        pre={pre}
                        post={post}
                        setDerniereTransition={setDerniereTransition}
                    />
                </div>

                <div className="rdp-matrice">
                    <Matrice
                        marquageInitial={marquageInitial}
                        marquageActuel={marquageActuel}
                        sequence={sequence}
                        pre={pre}
                        post={post}
                        onReset={handleReset}
                    />
                </div>
            </section>
        </main>
    );
}

export default Rdp;