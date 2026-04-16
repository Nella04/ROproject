export default function transformerDonnees(data) {
    // 1. DEPOTS → A, B, C...
    const depots = data.magasins.map((_, i) =>
        String.fromCharCode(65 + i) // 65 = 'A'
    );

    // 2. MAGASINS → 1, 2, 3...
    const magasins = data.depots.map((_, i) =>
        (i + 1).toString()
    );

    // 3. DISPONIBILITES (offres → valeurs seulement)
    const disponibilites = Object.values(data.offres)
        .filter(v => v !== "")
        .map(Number);

    // 4. BESOINS (Objectdemandes → valeurs seulement)
    const besoins = Object.values(data.demandes)
        .filter(v => v !== "")
        .map(Number);

    // 5. COUTS (matrice → convertir en nombres)
    const couts = data.matrice.map(ligne =>
        ligne.map(val => Number(val))
    );

    return {
        depots,
        magasins,
        disponibilites,
        besoins,
        couts
    };
}