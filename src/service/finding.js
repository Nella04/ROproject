const finding = {

    findMinWithPosition: (matrix, ignoredPositions = []) => {
        let min = Infinity;
        let position = { row: -1, col: -1 };

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {

                // vérifier si la position doit être ignorée
                const isIgnored = ignoredPositions.some(
                    pos => pos.row === i && pos.col === j
                );

                if (!isIgnored && matrix[i][j] < min) {
                    min = matrix[i][j];
                    position = { row: i, col: j };
                }
            }
        }

        return {
            min,
            position
        };
    }

}
export default finding;