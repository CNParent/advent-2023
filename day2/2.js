scripts.day2_2 = async () => {
    const limits = {
        red: 12,
        green: 13,
        blue: 14
    };

    let data = await getFile('day2/input.txt');
    let games = data.split('\r\n').map(game => {
        let parts = game.split(': ');
        let id = Number(parts[0].split(' ')[1]);
        let draws = parts[1].split('; ').map(drawText => {
            let draw = { red: 0, blue: 0, green: 0 };
            drawText.split(', ').map(cubeGroup => {
                let splitCubeGroup = cubeGroup.split(' ');
                draw[splitCubeGroup[1]] = Number(splitCubeGroup[0]);
            });

            return draw;
        });

        return { id, draws };
    });

    let powers = games.map(game => {
        let minRed = Math.max(...game.draws.map(d => d.red));
        let minGreen = Math.max(...game.draws.map(d => d.green));
        let minBlue = Math.max(...game.draws.map(d => d.blue));

        return minRed * minGreen * minBlue;
    });

    let sum = powers.reduce((a, b) => a + b, 0);
    terminal.textContent = `The sum of all games powers is ${sum}`;
}
