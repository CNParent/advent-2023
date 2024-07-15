scripts.day4_1 = async () => {
    let data = await getFile('day4/input.txt');
    let lines = data.split('\r\n');
    let cards = lines.map((l, i) => {
        let numbers = l.split(': ')[1].split(' | ');
        return {
            id: i + 1,
            numbers: numbers[0].trim().split(' ').filter(x => x !== '').map(Number),
            winners: numbers[1].trim().split(' ').filter(x => x !== '').map(Number)
        };
    });

    let points = cards.map(card => {
        let matches = card.numbers.filter(n => card.winners.includes(n)).length;
        return matches == 0 ? 0 : Math.pow(2, matches - 1);
    });

    let total = points.reduce((a,b) => a + b, 0);
    terminal.textContent = `Total points earned: ${total}`;
}
