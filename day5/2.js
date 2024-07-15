scripts.day5_2 = async () => {
    let data = await getFile('day5/input.txt');
    let groups = data.split('\r\n\r\n');
    let seedValues = groups[0].split(': ')[1].split(' ').map(Number);
    let seedGroups = [];
    for(let i = 0; i < seedValues.length; i += 2) {
        seedGroups.push({ start: seedValues[i], length: seedValues[i+1], end: seedValues[i] + seedValues[i+1] });
    }

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

        ranges.sort((a,b) => a.sourceStart - b.sourceStart);
        return {
            sourceType: from,
            targetType: to,
            ranges,
            destinations: []
        };
    });

    let doMap = (source, map, skip = Number.POSITIVE_INFINITY) => {
        let range = map.ranges.find(r => r.sourceStart <= source && source < r.sourceStart + r.offset);
        let target = source;
        let nextSkip = 0;
        if (range) {
            let delta = source - range.sourceStart;
            target = range.targetStart + delta;
            nextSkip = range.offset - delta;
        } else {
            range = map.ranges.find(r => r.sourceStart > source) ?? { sourceStart: Number.POSITIVE_INFINITY };
            nextSkip = range.sourceStart - source;
        }

        if (nextSkip < skip) skip = nextSkip;
        if (map.targetType == 'location') return { value: target, skip };

        return doMap(target, maps.find(m => m.sourceType == map.targetType), skip);
    };

    let seedMap = maps.find(m => m.sourceType == 'seed');
    let locations = seedGroups.map(seedGroup => {
        let seedLocations = [];
        let i = 0;
        while(i < seedGroup.length) {
            console.log(`Finding location for seed ${seedGroup.start + i}...`)
            let result = doMap(seedGroup.start + i, seedMap);
            seedLocations.push(result.value);
            i += result.skip;
        }

        return seedLocations;
    }).reduce((a,b) => a.concat(b), []);

    locations.sort((a,b) => a - b);
    console.log(locations);
    terminal.textContent = `Minimum location is ${locations[0]}`;
}
