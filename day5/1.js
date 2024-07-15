scripts.day5_1 = async () => {
    let data = await getFile('day5/input.txt');
    let groups = data.split('\r\n\r\n');
    let seeds = groups[0].split(': ')[1].split(' ').map(Number);
    let maps = groups.slice(1).map(group => {
        let [header, ...lines] = group.split('\r\n');
        let [from, , to] = header.split(' ')[0].split('-');
        let ranges = lines.map(line => {
            let values = line.split(' ').map(Number);
            return {
                sourceStart: values[1],
                targetStart: values[0],
                offset: values[2]
            };
        });

        return {
            sourceType: from,
            targetType: to,
            ranges
        };
    });

    let doMap = (source, map) => {
        console.log(`Looking up ${map.targetType} for ${map.sourceType} ${source}`);
        let range = map.ranges.find(r => r.sourceStart <= source && source < r.sourceStart + r.offset);
        let target = source;
        if (range) target = range.targetStart + source - range.sourceStart;
        if (map.targetType == 'location') return target;

        return doMap(target, maps.find(m => m.sourceType == map.targetType));
    };

    let seedMap = maps.find(m => m.sourceType == 'seed');
    let locations = seeds.map(seed => doMap(seed, seedMap));
    locations.sort((a,b) => a - b);
    console.log(locations);
    terminal.textContent = `Minimum location is ${locations[0]}`;
}
