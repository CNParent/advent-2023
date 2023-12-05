scripts.day1_2 = async () => {
    const digits = [
        { val: 1, text: 'one' },
        { val: 2, text: 'two' },
        { val: 3, text: 'three' },
        { val: 4, text: 'four' },
        { val: 5, text: 'five' },
        { val: 6, text: 'six' },
        { val: 7, text: 'seven' },
        { val: 8, text: 'eight' },
        { val: 9, text: 'nine' }
    ];

    let data = await getFile('day1/input.txt');
    let calibrations = data.split('\r\n').map(calibration => {
        let foundDigits = [];
        for(let i = 0; i < calibration.length; i++) {
            if (!isNaN(Number(calibration[i])))
                foundDigits.push(Number(calibration[i]));
            else {
                let digit = digits.find(d => calibration.substring(i).startsWith(d.text));
                if (digit) foundDigits.push(digit.val);
            }
        }

        return Number(`${foundDigits[0]}${foundDigits[foundDigits.length - 1]}`);
    });

    let sum = calibrations.reduce((a,b) => a + b, 0);
    terminal.textContent = `The calibration value is ${sum}`;
}
