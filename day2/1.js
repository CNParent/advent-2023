scripts.day2_1 = async () => {
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

    let validGames = games.filter(g => g.draws.every(d =>
        d.red <= limits.red &&
        d.green <= limits.green &&
        d.blue <= limits.blue));

    let sum = validGames.reduce((a, b) => a + b.id, 0);
    terminal.textContent = `The sum of all valid games is ${sum}`;
}
