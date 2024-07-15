scripts.day4_2 = async () => {
    let data = await getFile('day4/input.txt');
    let lines = data.split('\r\n');
    let cards = lines.map((l, i) => {
        let numbers = l.split(': ')[1].split(' | ');
        return {
            id: i + 1,
            numbers: numbers[0].trim().split(' ').filter(x => x !== '').map(Number),
            winners: numbers[1].trim().split(' ').filter(x => x !== '').map(Number),
            copies: 1
        };
    });

    cards.forEach((card, index) => {
        let matches = card.numbers.filter(n => card.winners.includes(n)).length;
        for(let i = matches; i > 0; i--) {
            cards[(index + i) % cards.length].copies += card.copies;
        }
    });

    let total = cards.reduce((a,b) => a + b.copies, 0);
    terminal.textContent = `Total scratch cards: ${total}`;
}
