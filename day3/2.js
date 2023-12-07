scripts.day3_2 = async () => {
    terminal.textContent = '';

    const digits = '0123456789';
    const empty = '.';
    let numberRegex = new RegExp('[0-9]+', 'g');
    
    let data = await getFile('day3/input.txt');
    let lines = data.split('\r\n');
    let symbols = lines.map((line, y) => {
        return [...line].map((char, x) => {
            if (char == empty || digits.includes(char)) return null;
            return { x, y, symbol: char };
        }).filter(symbol => symbol);
    }).reduce((a,b) => a.concat(b), []);

    let width = lines[0].length;
    let matches = [...data.replace(/\r\n/g, '').matchAll(numberRegex)];
    let numbers = matches.map(match => {
        let extents = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 }};
        extents.x.min = match.index % width;
        extents.x.max = extents.x.min + match[0].length - 1;
        extents.y.min = (match.index - extents.x.min) / width;
        extents.y.max = extents.y.min;
        return { extents, value: Number(match[0]) };
    });
    
    let getAdjacentNumbers = (symbol) => {
        return numbers.filter(n => 
            symbol.x >= n.extents.x.min - 1 && 
            symbol.x <= n.extents.x.max + 1 && 
            symbol.y >= n.extents.y.min - 1 &&
            symbol.y <= n.extents.y.max + 1);
    };

    let gearRatios = symbols
        .filter(x => x.symbol == '*')
        .map(g => getAdjacentNumbers(g))
        .filter(g => g.length == 2)
        .map(g => g[0].value * g[1].value);
    
    
    terminal.textContent += `Found ${gearRatios.length} gears\r\n`;

    let sum = gearRatios.reduce((a,b) => a + b, 0);
    terminal.textContent += `The sum of all gear ratios is ${sum}`;
}
