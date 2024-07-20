scripts.day6_1 = async () => {
    const chargeRate = 1;
    
    let data = await getFile('day6/input.txt');
    let groups = data.split('\r\n');
    let times = groups[0].split(':')[1].split(' ').filter(x => x).map(Number);
    let distances = groups[1].split(':')[1].split(' ').filter(x => x).map(Number);

    let runTest = (time = 0, timeCharging = 0) => ({ timeCharging, distance: (time - timeCharging) * (chargeRate * timeCharging)});
    let search = (from = runTest(0), to = runTest(0), time = 0, target = 0, slices = 2) => {
        if (to.timeCharging - from.timeCharging === 1) return [from, to].filter(x => x.distance > target);
        if (to.timeCharging - from.timeCharging < slices) slices = to.timeCharging - from.timeCharging;
        let delta = Math.round((to.timeCharging - from.timeCharging) / slices);
        let tests = [from];
        // skip first and last since from and to are already run
        for(let i = 1; i < slices; i++) {
            let timeCharging = from.timeCharging + delta * i;
            tests.push(runTest(time, timeCharging)); 
        }

        tests.push(to);
        let results = [];
        for(let i = 0; i < tests.length - 1; i++) {
            if (tests[i].distance <= target && tests[i+1].distance > target) results = results.concat(search(tests[i], tests[i+1], time, target, slices));
            else if (tests[i].distance > target && tests[i+1].distance <= target) results = results.concat(search(tests[i], tests[i+1], time, target, slices));
        }

        return results;
    };

    let product = 1;
    for(let i = 0; i < times.length; i++)  {
        let [min, max] = search(runTest(times[i], 0), runTest(times[i], times[i]), times[i], distances[i]).map(x => x.timeCharging);
        product *= max - min + 1;
    }

    terminal.textContent = `Product is ${product}`;
}
