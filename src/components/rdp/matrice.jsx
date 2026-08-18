import "../../style/components/rdp/matrice.css";

function Matrice({ marquageInitial, marquageActuel, sequence, pre, post, onReset }) {
    const places = Object.keys(pre); // ['P1', 'P2', ..., 'P9']
    const transitions = Object.keys(pre.P1); // ['T1', 'T2', ..., 'T6']

    // Calcul de la Matrice d'incidence W = POST - PRE
    const incidence = {};
    places.forEach((p) => {
        incidence[p] = {};
        transitions.forEach((t) => {
            incidence[p][t] = post[p][t] - pre[p][t];
        });
    });

    return (
        <div className="matrice-container">
            <div className="matrice-header">
                <h2 className="text-primary-color">Analyse Matricielle</h2>
                <button
                    type="button"
                    className="bouton-btn bouton-btn-secondary btn-reset"
                    onClick={onReset}
                >
                    Réinitialiser
                </button>
            </div>

            {/* SÉQUENCE DE TRANSITION & ÉQUATION D'ÉTAT */}
            <div className="vector-card">
                <h3>Séquence de transition (S)</h3>
                <div className="vector-display">
                    <span className="vector-bracket">(</span>
                    {transitions.map((t, idx) => (
                        <span key={t} className="vector-item">
                            <small>{t}</small>
                            <strong>{sequence[t]}</strong>
                            {idx < transitions.length - 1 }
                        </span>
                    ))}
                    <span className="vector-bracket">)</span>
                </div>
            </div>

            {/* MARQUAGE INITIAL ET FINAL */}
            <div className="markings-grid">
                <div className="marking-box">
                    <h4>Marquage Initial (M₀)</h4>
                    <div className="vector-row">
                        [{places.map((p) => marquageInitial[p]).join(", ")}]
                    </div>
                </div>
                <div className="marking-box active">
                    <h4>Marquage Actuel (M = M₀ + W·S)</h4>
                    <div className="vector-row text-primary-color">
                        [{places.map((p) => marquageActuel[p]).join(", ")}]
                    </div>
                </div>
            </div>

            {/* MATRICE D'INCIDENCE (W = POST - PRE) */}
            <div className="table-card">
                <h3>Matrice d'Incidence W (POST - PRE)</h3>
                <div className="table-responsive">
                    <table className="rdp-table table-incidence">
                        <thead>
                            <tr>
                                <th>W</th>
                                {transitions.map((t) => (
                                    <th key={t}>{t}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {places.map((p) => (
                                <tr key={p}>
                                    <th>{p}</th>
                                    {transitions.map((t) => {
                                        const val = incidence[p][t];
                                        return (
                                            <td
                                                key={t}
                                                className={
                                                    val > 0
                                                        ? "val-positive"
                                                        : val < 0
                                                        ? "val-negative"
                                                        : ""
                                                }
                                            >
                                                {val > 0 ? `+${val}` : val}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MATRICES PRE & POST EN ACCORDÉON / CÔTE À CÔTE */}
            <div className="sub-matrices-grid">
                {/* MATRICE PRE */}
                <div className="table-card compact">
                    <h3>Matrice PRE</h3>
                    <div className="table-responsive">
                        <table className="rdp-table">
                            <thead>
                                <tr>
                                    <th>PRE</th>
                                    {transitions.map((t) => (
                                        <th key={t}>{t}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {places.map((p) => (
                                    <tr key={p}>
                                        <th>{p}</th>
                                        {transitions.map((t) => (
                                            <td key={t}>{pre[p][t]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MATRICE POST */}
                <div className="table-card compact">
                    <h3>Matrice POST</h3>
                    <div className="table-responsive">
                        <table className="rdp-table">
                            <thead>
                                <tr>
                                    <th>POST</th>
                                    {transitions.map((t) => (
                                        <th key={t}>{t}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {places.map((p) => (
                                    <tr key={p}>
                                        <th>{p}</th>
                                        {transitions.map((t) => (
                                            <td key={t}>{post[p][t]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Matrice;