import "../../style/components/rdp/image.css";

function Image({
    marquageActuel,
    setMarquageActuel,
    sequence,
    setSequence,
    pre,
    post,
    setDerniereTransition
}) {
    const placesBinaires = ["P3", "P4", "P5", "P6", "P8"];

    // Vérifier si la transition est franchissable
    const estFranchissable = (transition) => {
        // 1. Condition PRE
        for (const place in pre) {
            const besoin = pre[place][transition];
            if (besoin > 0 && (marquageActuel[place] || 0) < besoin) {
                return false;
            }
        }

        // 2. Condition POST (Places binaires limitées à 1)
        for (const place in post) {
            const gain = post[place][transition];
            if (gain > 0 && placesBinaires.includes(place)) {
                const consomme = pre[place]?.[transition] || 0;
                const futur = (marquageActuel[place] || 0) - consomme + gain;
                if (futur > 1) return false;
            }
        }

        return true;
    };

    // Exécuter la transition
    const franchirTransition = (transition) => {
        setDerniereTransition(transition);
        if (!estFranchissable(transition)) return;
        

        // Mise à jour du marquage
        setMarquageActuel((prev) => {
            const nouveau = { ...prev };
            for (const place in pre) {
                nouveau[place] -= pre[place][transition];
            }
            for (const place in post) {
                nouveau[place] += post[place][transition];
            }
            return nouveau;
        });

        // Incrémentation de la séquence de transition
        setSequence((prevSeq) => ({
            ...prevSeq,
            [transition]: prevSeq[transition] + 1
        }));
    };

    // Modification manuelle de la valeur d'une place
    const handleJetonsChange = (place, val) => {
        let n = parseInt(val, 10);
        if (isNaN(n) || n < 0) n = 0;
        if (placesBinaires.includes(place) && n > 1) n = 1;

        setMarquageActuel((prev) => ({
            ...prev,
            [place]: n
        }));
    };

    const coordsPlaces = {
        P1: { x: 120, y: 160 },
        P2: { x: 420, y: 60 },
        P3: { x: 500, y: 160 },
        P4: { x: 500, y: 360 },
        P5: { x: 780, y: 360 },
        P6: { x: 500, y: 580 },
        P7: { x: 880, y: 240 },
        P8: { x: 920, y: 580 },
        P9: { x: 1100, y: 720 },
    };

    const coordsTransitions = {
        T1: { x: 230, y: 137.5, text: "Un client s’installe à la caisse", posText: { x: 280, y: 122, anchor: "middle" } },
        T2: { x: 650, y: 137.5, text: "Payer et encaisser", posText: { x: 700, y: 122, anchor: "middle" } },
        T3: { x: 450, y: 237.5, text: "Bloquer caisse", posText: { x: 565, y: 265, anchor: "start" } },
        T4: { x: 450, y: 447.5, text: "Commencer intervention", posText: { x: 430, y: 475, anchor: "end" } },
        T5: { x: 650, y: 557.5, text: "Valider et payer client", posText: { x: 700, y: 630, anchor: "middle" } },
        T6: { x: 1050, y: 557.5, text: "Sortir", posText: { x: 1100, y: 540, anchor: "middle" } },
    };

    return (
        <div className="image">
            <div className="petri-net">
                <svg className="petri-net-svg" viewBox="0 0 1220 820" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="var(--primary-color)" />
                        </marker>
                    </defs>

                    {/* Arcs */}
                    <line className="petri-arc" x1="148" y1="160" x2="228" y2="160" />
                    <line className="petri-arc" x1="395" y1="77" x2="325" y2="135" />
                    <line className="petri-arc" x1="330" y1="160" x2="470" y2="160" />
                    <line className="petri-arc" x1="530" y1="160" x2="648" y2="160" />
                    <path className="petri-arc" d="M 680 137 C 680 50, 530 40, 450 55" />
                    <line className="petri-arc" x1="750" y1="160" x2="852" y2="225" />
                    <line className="petri-arc" x1="500" y1="190" x2="500" y2="235" />
                    <line className="petri-arc" x1="500" y1="282" x2="500" y2="330" />
                    <line className="petri-arc" x1="500" y1="390" x2="500" y2="445" />
                    <line className="petri-arc" x1="755" y1="370" x2="552" y2="465" />
                    <line className="petri-arc" x1="500" y1="492" x2="500" y2="550" />
                    <line className="petri-arc" x1="530" y1="580" x2="648" y2="580" />
                    <path className="petri-arc" d="M 720 557 C 750 480, 770 430, 775 390" />
                    <path className="petri-arc" d="M 735 557 C 820 480, 860 380, 875 270" />
                    <line className="petri-arc" x1="750" y1="580" x2="890" y2="580" />
                    <line className="petri-arc" x1="902" y1="258" x2="1080" y2="555" />
                    <line className="petri-arc" x1="950" y1="580" x2="1048" y2="580" />
                    <line className="petri-arc" x1="1100" y1="602" x2="1100" y2="690" />

                    {/* Places */}
                    {Object.entries(coordsPlaces).map(([key, { x, y }]) => (
                        <g key={key} className="petri-place">
                            <circle cx={x} cy={y} r="28" />
                            <text x={x} y={y - 8} textAnchor="middle">{key}</text>
                            <foreignObject x={x - 20} y={y + 1} width="40" height="22">
                                <input
                                    type="number"
                                    className="jeton-input"
                                    min="0"
                                    max={placesBinaires.includes(key) ? "1" : undefined}
                                    value={marquageActuel[key] ?? 0}
                                    onChange={(e) => handleJetonsChange(key, e.target.value)}
                                />
                            </foreignObject>
                        </g>
                    ))}

                    {/* Descriptions des places */}
                    <text x="120" y="110" className="petri-desc" textAnchor="middle">Nombre de client en attente 0 à n</text>
                    <text x="420" y="20" className="petri-desc" textAnchor="middle">Nombre de caisse disponible 0 à n</text>
                    <text x="460" y="115" className="petri-desc" textAnchor="start">Scanner produit</text>
                    <text x="450" y="365" className="petri-desc" textAnchor="end">En attente agent</text>
                    <text x="820" y="365" className="petri-desc" textAnchor="start">Agent disponible</text>
                    <text x="450" y="585" className="petri-desc" textAnchor="end">Intervention</text>
                    <text x="880" y="195" className="petri-desc" textAnchor="middle">Client en attente portique 0 à n</text>
                    <text x="920" y="635" className="petri-desc" textAnchor="middle">Machine scanner disponible</text>
                    <text x="1100" y="775" className="petri-desc" textAnchor="middle">Client dehors</text>

                    {/* Transitions */}
                    {Object.entries(coordsTransitions).map(([tKey, { x, y, text, posText }]) => {
                        const active = estFranchissable(tKey);
                        return (
                            <g key={tKey} className="petri-transition">
                                <foreignObject x={x} y={y} width="100" height="45">
                                    <button
                                        type="button"
                                        className="bouton-btn bouton-btn-primary transition-btn"
                                        disabled={!active}
                                        onClick={() => franchirTransition(tKey)}
                                    >
                                        {tKey}
                                    </button>
                                </foreignObject>
                                <text x={posText.x} y={posText.y} className="petri-desc" textAnchor={posText.anchor}>{text}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

export default Image;