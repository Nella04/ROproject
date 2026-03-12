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

        const isAllBlocked = () => bloque.length >= rows * cols;

        while (!isAllBlocked()) {

            // 1️⃣ chercher le minimum
            const { min, position } = finding.findMinWithPosition(couts, bloque);

            if (position.row === -1) break;

            const row = position.row;
            const col = position.col;

            // 2️⃣ récupérer disponibilite et besoin
            let dispoValue = Array.isArray(disponibilites[row])
                ? disponibilites[row][disponibilites[row].length - 1]
                : disponibilites[row];

            let besoinValue = Array.isArray(besoins[col])
                ? besoins[col][besoins[col].length - 1]
                : besoins[col];

            // 3️⃣ calcul aMoins
            const aMoins = Math.min(dispoValue, besoinValue);

            // 4️⃣ sauvegarder dans minitab
            minitabmat.push({
                position: { row, col },
                nombre: aMoins
            });

            // 5️⃣ mise à jour disponibilité
            const newDispo = dispoValue - aMoins;

            if (Array.isArray(disponibilites[row])) {
                disponibilites[row].push(newDispo);
            } else {
                disponibilites[row] = [disponibilites[row], newDispo];
            }

            // 6️⃣ mise à jour besoin
            const newBesoin = besoinValue - aMoins;

            if (Array.isArray(besoins[col])) {
                besoins[col].push(newBesoin);
            } else {
                besoins[col] = [besoins[col], newBesoin];
            }

            // 7️⃣ bloquer colonne si besoin = 0
            if (newBesoin === 0) {
                for (let i = 0; i < rows; i++) {
                    const exists = bloque.some(p => p.row === i && p.col === col);
                    if (!exists) bloque.push({ row: i, col });
                }
            }

            // 8️⃣ bloquer ligne si disponibilité = 0
            if (newDispo === 0) {
                for (let j = 0; j < cols; j++) {
                    const exists = bloque.some(p => p.row === row && p.col === j);
                    if (!exists) bloque.push({ row, col: j });
                }
            }

        }

        return {
            depots,
            magasins,
            disponibilites,
            besoins,
            couts,
            minitabmat,
            bloque
        };
    },

    solveTransport2: (donnees) => {
        let { 
            couts, 
            disponibilites, 
            besoins, 
            bloque = [], 
            minitabmat = [] 
        } = donnees;

        // On continue tant qu'on trouve un coût minimal (tant que tout n'est pas bloqué)
        const result = finding.findMinWithPosition(couts, bloque);
        
        if (result.min === Infinity) {
            return donnees; // Tout est bloqué, on s'arrête
        }

        const { row, col } = result.position;

        // Récupérer la valeur actuelle de dispo et besoin (dernière valeur si c'est un tableau)
        const getVal = (val) => Array.isArray(val) ? val[val.length - 1] : val;
        
        const currentDispo = getVal(disponibilites[row]);
        const currentBesoin = getVal(besoins[col]);

        // Calcul de amoin (le minimum entre dispo et besoin)
        const amoin = Math.min(currentDispo, currentBesoin);

        // Mise à jour des disponibilités (on ajoute la nouvelle valeur après soustraction)
        const newDisponibilites = [...disponibilites];
        const diffDispo = currentDispo - amoin;
        newDisponibilites[row] = Array.isArray(newDisponibilites[row]) 
            ? [...newDisponibilites[row], diffDispo] 
            : [newDisponibilites[row], diffDispo];

        // Mise à jour des besoins
        const newBesoins = [...besoins];
        const diffBesoin = currentBesoin - amoin;
        newBesoins[col] = Array.isArray(newBesoins[col]) 
            ? [...newBesoins[col], diffBesoin] 
            : [newBesoins[col], diffBesoin];

        // Enregistrer amoin et sa position
        const newMinitabmat = [...minitabmat, { position: [row, col], nombre: amoin }];

        // Gestion du blocage (Ligne ou Colonne)
        let newBloque = [...bloque];
        if (diffBesoin === 0) {
            // Bloquer toute la colonne
            for (let i = 0; i < couts.length; i++) {
                if (!newBloque.some(p => p.row === i && p.col === col)) {
                    newBloque.push({ row: i, col: col });
                }
            }
        } else if (diffDispo === 0) {
            // Bloquer toute la ligne
            for (let j = 0; j < couts[0].length; j++) {
                if (!newBloque.some(p => p.row === row && p.col === j)) {
                    newBloque.push({ row: row, col: j });
                }
            }
        }

        // Retourner les nouvelles données pour l'itération suivante
        const nouvellesDonnees = {
            ...donnees,
            disponibilites: newDisponibilites,
            besoins: newBesoins,
            bloque: newBloque,
            minitabmat: newMinitabmat
        };

        // Récurence : On relance jusqu'à ce que tout soit bloqué
        return finding.solveTransport(nouvellesDonnees);
    }

};

export default finding;