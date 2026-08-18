import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/pages/firstpage.scss";

export default function FirstPage() {
    const navigate = useNavigate();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "brown"
    );

    useEffect(() => {
        document.body.classList.remove(
            "theme-brown",
            "theme-blue",
            "theme-pink"
        );

        document.body.classList.add(`theme-${theme}`);

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <main className="first-page">

            <section className="hero">

                <div className="hero-content">

                    <span className="hero-badge">
                        Projet académique
                    </span>

                    <h1>
                        Recherche Opérationnelle
                        <span>&</span>
                        Réseaux de Petri
                    </h1>

                    <p className="hero-description">
                        la compréhension,
                        la visualisation et la résolution de problèmes
                        liés à la recherche opérationnelle et aux réseaux de Petri.
                    </p>

                    <div className="hero-actions">

                        <button
                            type="button"
                            className="project-button project-button-primary"
                            onClick={() => navigate("/second")}
                        >
                            <span>Recherche Opérationnelle</span>
                            <span className="button-arrow">→</span>
                        </button>

                        <button
                            type="button"
                            className="project-button project-button-secondary"
                            onClick={() => navigate("/rdp")}
                        >
                            <span>Réseaux de Petri</span>
                            <span className="button-arrow">→</span>
                        </button>

                    </div>

                </div>

                <div className="hero-decoration">

                    <div className="decoration-circle circle-one"></div>
                    <div className="decoration-circle circle-two"></div>

                    <div className="decoration-card">
                        <div className="decoration-card-header">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className="decoration-lines">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className="decoration-node-container">
                            <div className="decoration-node"></div>
                            <div className="decoration-line"></div>
                            <div className="decoration-node"></div>
                            <div className="decoration-line"></div>
                            <div className="decoration-node"></div>
                        </div>
                    </div>

                </div>

            </section>


            <section className="definitions">

                <div className="section-heading">

                    <span className="section-label">
                        À propos du projet
                    </span>

                    <h2>
                        Projet Recherche Opérationnelle
                    </h2>

                    <p>
                        Découvrez les concepts fondamentaux à travers
                        une interface conçue pour faciliter leur
                        compréhension et leur exploration.
                    </p>

                </div>


                <div className="definition-grid">

                    {/* Recherche opérationnelle */}

                    <article className="definition-card">

                        <div className="card-number">
                            01
                        </div>

                        <div className="card-icon">
                            3007
                        </div>

                        <h3>
                            ROHAMA NAHITANTSOA ORNELLA
                        </h3>

                        <p>

                        </p>


                    </article>


                    {/* Réseaux de Petri */}

                    <article className="definition-card">

                        <div className="card-number">
                            02
                        </div>

                        <div className="card-icon petri-icon">
                            2910
                        </div>

                        

                    </article>

                </div>

            </section>


            {/* =========================
                THEME
            ========================= */}

            <section className="theme-section">

                <div className="theme-content">

                    <span className="section-label">
                        Personnalisation
                    </span>

                    <h2>
                        Choisissez votre
                        <span> ambiance</span>
                    </h2>

                    <p>
                        Personnalisez l'apparence de l'application
                        selon votre préférence.
                    </p>

                </div>


                <div className="theme-selector">

                    {/* Marron */}

                    <label
                        className={`theme-option ${theme === "brown" ? "active" : ""
                            }`}
                    >

                        <input
                            type="radio"
                            name="theme"
                            value="brown"
                            checked={theme === "brown"}
                            onChange={(e) => setTheme(e.target.value)}
                        />

                        <span className="radio-circle"></span>

                        <span className="theme-info">
                            <strong>Marron</strong>
                            <small>Chaleureux & naturel</small>
                        </span>

                        <span className="theme-colors">
                            <span className="color-primary brown-primary"></span>
                            <span className="color-secondary brown-secondary"></span>
                        </span>

                    </label>


                    {/* Bleu */}

                    <label
                        className={`theme-option ${theme === "blue" ? "active" : ""
                            }`}
                    >

                        <input
                            type="radio"
                            name="theme"
                            value="blue"
                            checked={theme === "blue"}
                            onChange={(e) => setTheme(e.target.value)}
                        />

                        <span className="radio-circle"></span>

                        <span className="theme-info">
                            <strong>Bleu</strong>
                            <small>Calme & professionnel</small>
                        </span>

                        <span className="theme-colors">
                            <span className="color-primary blue-primary"></span>
                            <span className="color-secondary blue-secondary"></span>
                        </span>

                    </label>


                    {/* Rose */}

                    <label
                        className={`theme-option ${theme === "pink" ? "active" : ""
                            }`}
                    >

                        <input
                            type="radio"
                            name="theme"
                            value="pink"
                            checked={theme === "pink"}
                            onChange={(e) => setTheme(e.target.value)}
                        />

                        <span className="radio-circle"></span>

                        <span className="theme-info">
                            <strong>Vieux Rose</strong>
                            <small>Doux & élégant</small>
                        </span>

                        <span className="theme-colors">
                            <span className="color-primary pink-primary"></span>
                            <span className="color-secondary pink-secondary"></span>
                        </span>

                    </label>

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer className="first-page-footer">

                <span>
                    Recherche Opérationnelle & Réseaux de Petri
                </span>

                <span>
                    Projet académique
                </span>

            </footer>

        </main>
    );
}