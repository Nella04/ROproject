import "../../style/components/rdp/image.css";

function Image({ matrice, somme }) {
    return (
        <div className="image">
            <div className="petri-net">
                <svg
                    className="petri-net-svg"
                    viewBox="0 0 1220 820"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* =================================================
                        DEFINITION DE LA FLECHE
                    ================================================= */}
                    <defs>
                        <marker
                            id="arrow"
                            markerWidth="10"
                            markerHeight="10"
                            refX="8"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <path
                                d="M0,0 L0,6 L9,3 z"
                                fill="var(--primary-color, #1e293b)"
                            />
                        </marker>
                    </defs>

                    {/* =================================================
                        ARCS (FLÈCHES)
                    ================================================= */}

                    {/* P1 → T1 */}
                    <line className="petri-arc" x1="148" y1="160" x2="228" y2="160" />

                    {/* P2 → T1 */}
                    <line className="petri-arc" x1="395" y1="77" x2="325" y2="135" />

                    {/* T1 → P3 */}
                    <line className="petri-arc" x1="330" y1="160" x2="470" y2="160" />

                    {/* P3 → T2 */}
                    <line className="petri-arc" x1="530" y1="160" x2="648" y2="160" />

                    {/* T2 → P2 (Boucle de retour) */}
                    <path
                        className="petri-arc"
                        d="M 680 137 C 680 50, 530 40, 450 55"
                    />

                    {/* T2 → P7 */}
                    <line className="petri-arc" x1="750" y1="160" x2="852" y2="225" />

                    {/* P3 → T3 */}
                    <line className="petri-arc" x1="500" y1="190" x2="500" y2="235" />

                    {/* T3 → P4 */}
                    <line className="petri-arc" x1="500" y1="282" x2="500" y2="330" />

                    {/* P4 → T4 */}
                    <line className="petri-arc" x1="500" y1="390" x2="500" y2="445" />

                    {/* P5 → T4 */}
                    <line className="petri-arc" x1="755" y1="370" x2="552" y2="465" />

                    {/* T4 → P6 */}
                    <line className="petri-arc" x1="500" y1="492" x2="500" y2="550" />

                    {/* P6 → T5 */}
                    <line className="petri-arc" x1="530" y1="580" x2="648" y2="580" />

                    {/* T5 → P5 */}
                    <path
                        className="petri-arc"
                        d="M 720 557 C 750 480, 770 430, 775 390"
                    />

                    {/* T5 → P7 */}
                    <path
                        className="petri-arc"
                        d="M 735 557 C 820 480, 860 380, 875 270"
                    />

                    {/* T5 → P8 */}
                    <line className="petri-arc" x1="750" y1="580" x2="890" y2="580" />

                    {/* P7 → T6 */}
                    <line className="petri-arc" x1="902" y1="258" x2="1080" y2="555" />

                    {/* P8 → T6 */}
                    <line className="petri-arc" x1="950" y1="580" x2="1048" y2="580" />

                    {/* T6 → P9 */}
                    <line className="petri-arc" x1="1100" y1="602" x2="1100" y2="690" />


                    {/* =================================================
                        PLACES (CERCLES + ETIQUETTES + DESCRIPTIONS)
                    ================================================= */}

                    {/* P1 */}
                    <g className="petri-place">
                        <circle cx="120" cy="160" r="28" />
                        <text x="120" y="166" textAnchor="middle">P1</text>
                        <text x="120" y="110" className="petri-desc" textAnchor="middle">
                            Nombre de client en attente 0 à n
                        </text>
                    </g>

                    {/* P2 */}
                    <g className="petri-place">
                        <circle cx="420" cy="60" r="28" />
                        <text x="420" y="66" textAnchor="middle">P2</text>
                        <text x="420" y="20" className="petri-desc" textAnchor="middle">
                            Nombre de caisse disponible 0 à n
                        </text>
                    </g>

                    {/* P3 */}
                    <g className="petri-place">
                        <circle cx="500" cy="160" r="28" />
                        <text x="500" y="166" textAnchor="middle">P3</text>
                        <text x="460" y="130" className="petri-desc" textAnchor="start">
                            Scanner produit
                        </text>
                    </g>

                    {/* P4 */}
                    <g className="petri-place">
                        <circle cx="500" cy="360" r="28" />
                        <text x="500" y="366" textAnchor="middle">P4</text>
                        <text x="450" y="365" className="petri-desc" textAnchor="end">
                            En attente agent
                        </text>
                    </g>

                    {/* P5 */}
                    <g className="petri-place">
                        <circle cx="780" cy="360" r="28" />
                        <text x="780" y="366" textAnchor="middle">P5</text>
                        <text x="820" y="365" className="petri-desc" textAnchor="start">
                            Agent disponible
                        </text>
                    </g>

                    {/* P6 */}
                    <g className="petri-place">
                        <circle cx="500" cy="580" r="28" />
                        <text x="500" y="586" textAnchor="middle">P6</text>
                        <text x="450" y="585" className="petri-desc" textAnchor="end">
                            Intervention
                        </text>
                    </g>

                    {/* P7 */}
                    <g className="petri-place">
                        <circle cx="880" cy="240" r="28" />
                        <text x="880" y="246" textAnchor="middle">P7</text>
                        <text x="880" y="195" className="petri-desc" textAnchor="middle">
                            Client en attente portique 0 à n
                        </text>
                    </g>

                    {/* P8 */}
                    <g className="petri-place">
                        <circle cx="920" cy="580" r="28" />
                        <text x="920" y="586" textAnchor="middle">P8</text>
                        <text x="920" y="635" className="petri-desc" textAnchor="middle">
                            Machine scanner disponible
                        </text>
                    </g>

                    {/* P9 */}
                    <g className="petri-place">
                        <circle cx="1100" cy="720" r="28" />
                        <text x="1100" y="726" textAnchor="middle">P9</text>
                        <text x="1100" y="775" className="petri-desc" textAnchor="middle">
                            Client dehors
                        </text>
                    </g>


                    {/* =================================================
                        TRANSITIONS (RECTANGLES + ETIQUETTES + DESCRIPTIONS)
                    ================================================= */}

                    {/* T1 */}
                    <g className="petri-transition">
                        <rect x="230" y="137.5" width="100" height="45" rx="6" />
                        <text x="280" y="165" textAnchor="middle">T1</text>
                        <text x="280" y="122" className="petri-desc" textAnchor="middle">
                            Un client s’installe à la caisse
                        </text>
                    </g>

                    {/* T2 */}
                    <g className="petri-transition">
                        <rect x="650" y="137.5" width="100" height="45" rx="6" />
                        <text x="700" y="165" textAnchor="middle">T2</text>
                        <text x="700" y="122" className="petri-desc" textAnchor="middle">
                            Payer et encaisser
                        </text>
                    </g>

                    {/* T3 */}
                    <g className="petri-transition">
                        <rect x="450" y="237.5" width="100" height="45" rx="6" />
                        <text x="500" y="265" textAnchor="middle">T3</text>
                        <text x="565" y="265" className="petri-desc" textAnchor="start">
                            Bloquer caisse
                        </text>
                    </g>

                    {/* T4 */}
                    <g className="petri-transition">
                        <rect x="450" y="447.5" width="100" height="45" rx="6" />
                        <text x="500" y="475" textAnchor="middle">T4</text>
                        <text x="430" y="475" className="petri-desc" textAnchor="end">
                            Commencer intervention
                        </text>
                    </g>

                    {/* T5 */}
                    <g className="petri-transition">
                        <rect x="650" y="557.5" width="100" height="45" rx="6" />
                        <text x="700" y="585" textAnchor="middle">T5</text>
                        <text x="700" y="630" className="petri-desc" textAnchor="middle">
                            Valider et payer client
                        </text>
                    </g>

                    {/* T6 */}
                    <g className="petri-transition">
                        <rect x="1050" y="557.5" width="100" height="45" rx="6" />
                        <text x="1100" y="585" textAnchor="middle">T6</text>
                        <text x="1100" y="540" className="petri-desc" textAnchor="middle">
                            Sortir
                        </text>
                    </g>

                </svg>
            </div>
        </div>
    );
}

export default Image;