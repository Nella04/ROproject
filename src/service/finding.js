const finding = {

    // Fonction existante pour trouver le minimum
    findMinWithPosition: (matrix, ignoredPositions = []) => {
        let min = Infinity;
        let position = { row: -1, col: -1 };

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {

                const isIgnored = ignoredPositions.some(
                    pos => pos.row === i && pos.col === j
                );

                if (!isIgnored && matrix[i][j] < min) {
                    min = matrix[i][j];
                    position = { row: i, col: j };
                }
            }
        }

        return { min, position };
    },

    solveTransport: (data) => {

        let depots = [...data.depots];
        let magasins = [...data.magasins];
        let disponibilites = JSON.parse(JSON.stringify(data.disponibilites));
        let besoins = JSON.parse(JSON.stringify(data.besoins));
        let couts = data.couts.map(r => [...r]);

        let bloque = [];
        let minitabmat = [];

        const rows = couts.length;
        const cols = couts[0].length;

        const etapes = [];

        const isAllBlocked = () => bloque.length >= rows * cols;

        while (!isAllBlocked()) {

            const { min, position } = finding.findMinWithPosition(couts, bloque);

            if (position.row === -1) break;

            const row = position.row;
            const col = position.col;

            let dispoValue = Array.isArray(disponibilites[row])
                ? disponibilites[row][disponibilites[row].length - 1]
                : disponibilites[row];

            let besoinValue = Array.isArray(besoins[col])
                ? besoins[col][besoins[col].length - 1]
                : besoins[col];

            const aMoins = Math.min(dispoValue, besoinValue);

            minitabmat.push({
                position: { row, col },
                nombre: aMoins
            });

            const newDispo = dispoValue - aMoins;
            const newBesoin = besoinValue - aMoins;

            // update dispo
            if (Array.isArray(disponibilites[row])) {
                disponibilites[row].push(newDispo);
            } else {
                disponibilites[row] = [disponibilites[row], newDispo];
            }

            // update besoin
            if (Array.isArray(besoins[col])) {
                besoins[col].push(newBesoin);
            } else {
                besoins[col] = [besoins[col], newBesoin];
            }

            // cas spécial : disponibilité ET besoin deviennent 0
            if (newDispo === 0 && newBesoin === 0) {

                // bloquer toute la ligne
                for (let j = 0; j < cols; j++) {
                    if (!bloque.some(p => p.row === row && p.col === j)) {
                        bloque.push({ row, col: j });
                    }
                }

                // bloquer toute la colonne
                for (let i = 0; i < rows; i++) {
                    if (!bloque.some(p => p.row === i && p.col === col)) {
                        bloque.push({ row: i, col });
                    }
                }

            }
            else if (newBesoin === 0) {

                // bloquer seulement la colonne
                for (let i = 0; i < rows; i++) {
                    if (!bloque.some(p => p.row === i && p.col === col)) {
                        bloque.push({ row: i, col });
                    }
                }

            }
            else if (newDispo === 0) {

                // bloquer seulement la ligne
                for (let j = 0; j < cols; j++) {
                    if (!bloque.some(p => p.row === row && p.col === j)) {
                        bloque.push({ row, col: j });
                    }
                }

            }

            // ⭐ SAUVEGARDER L'ÉTAT DE CETTE ÉTAPE
            etapes.push({
                depots: [...depots],
                magasins: [...magasins],
                disponibilites: JSON.parse(JSON.stringify(disponibilites)),
                besoins: JSON.parse(JSON.stringify(besoins)),
                couts: JSON.parse(JSON.stringify(couts)),
                minitabmat: JSON.parse(JSON.stringify(minitabmat)),
                bloque: JSON.parse(JSON.stringify(bloque))
            });

        }

        return etapes;
    },

    getNextStep: (donnees) => {
        let couts = donnees.matriceCoûts || donnees.couts;
        let disponibilites = [...(donnees.disponibilites || donnees.dispo)];
        let besoins = [...(donnees.besoins || donnees.besoin)];
        let minitabmat = Array.isArray(donnees.minitabmat) ? [...donnees.minitabmat] : [];
        let bloque = Array.isArray(donnees.bloque) ? [...donnees.bloque] : [];

        const result = finding.findMinWithPosition(couts, bloque);
        if (result.min === Infinity) return null; // Plus d'étapes possibles

        const { row, col } = result.position;
        const getVal = (val) => Array.isArray(val) ? val[val.length - 1] : val;
        const currentDispo = getVal(disponibilites[row]);
        const currentBesoin = getVal(besoins[col]);
        const amoin = Math.min(currentDispo, currentBesoin);

        // Mise à jour des valeurs
        const diffDispo = currentDispo - amoin;
        disponibilites[row] = Array.isArray(disponibilites[row]) ? [...disponibilites[row], diffDispo] : [disponibilites[row], diffDispo];

        const diffBesoin = currentBesoin - amoin;
        besoins[col] = Array.isArray(besoins[col]) ? [...besoins[col], diffBesoin] : [besoins[col], diffBesoin];

        minitabmat.push({ position: [row, col], nombre: amoin });

        // Blocage
        if (diffBesoin === 0) {
            for (let i = 0; i < couts.length; i++) {
                if (!bloque.some(p => p.row === i && p.col === col)) bloque.push({ row: i, col: col });
            }
        } else if (diffDispo === 0) {
            for (let j = 0; j < couts[0].length; j++) {
                if (!bloque.some(p => p.row === row && p.col === j)) bloque.push({ row: row, col: j });
            }
        }

        return { ...donnees, disponibilites, besoins, minitabmat, bloque };
    }

};

export default finding;