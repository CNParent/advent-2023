scripts.day1_1 = async () => {
    let data = await getFile('day1/input.txt');
    let calibrations = data.split('\r\n').map(calibration => {
        let numbers = [...calibration].map(c => Number(c)).filter(n => !isNaN(n));
        return Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
    });

    let sum = calibrations.reduce((a,b) => a + b, 0);
    terminal.textContent = `The calibration value is ${sum}`;
}
