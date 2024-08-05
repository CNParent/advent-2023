scripts.day7_1 = async () => {
    const cardScores = {
        A: 13,
        K: 12,
        Q: 11,
        J: 10,
        T: 9,
        '9': 8,
        '8': 7,
        '7': 6,
        '6': 5,
        '5': 4,
        '4': 3,
        '3': 2,
        '2': 1
    };

    const handKinds = {
        five: 6,
        four: 5,
        house: 4,
        three: 3,
        twoPair: 2,
        pair: 1,
        highCard: 0
    };

    let data = await getFile('day7/input.txt');
    let hands = data.split('\r\n').map(x => {
        let parts = x.split(' ');
        let cards = parts[0].split('');
        return { cards, bid: Number(parts[1]) };
    })

    function group(hand) {
        let groups = [];
        hand.forEach(card => {
            let group = groups.find(g => g.card == card);
            if (!group) groups.push({ card, count: 1 });
            else group.count++;
        });

        return groups;
    }

    function getHandKind(groups) {
        if (isFive(groups)) return handKinds.five;
        if (isFour(groups)) return handKinds.four;
        if (isFullHouse(groups)) return handKinds.house;
        if (isThree(groups)) return handKinds.three;
        if (isTwoPair(groups)) return handKinds.twoPair;
        if (isPair(groups)) return handKinds.pair;
        return handKinds.highCard;
    }

    function isFive(groups) {
        return groups.find(g => g.count == 5) != null;
    }

    function isFour(groups) {
        return groups.find(g => g.count == 4) != null;
    }

    function isFullHouse(groups) {
        return groups.find(g => g.count == 3) != null &&
            groups.find(g => g.count == 2) != null;
    }

    function isThree(groups) {
        return groups.find(g => g.count == 3) != null;
    }

    function isTwoPair(groups) {
        return groups.filter(g => g.count == 2).length == 2;
    }

    function isPair(groups) {
        return groups.filter(g => g.count == 2).length == 1;
    }

    function compareHands(a, b) {
        let kindA = getHandKind(group(a));
        let kindB = getHandKind(group(b));
        let diff = kindA - kindB;
        for(let i = 0; diff == 0 && i < a.length; i++) {
            diff = cardScores[a[i]] - cardScores[b[i]];
        }

        return diff;
    }

    hands.sort((a,b) => compareHands(a.cards, b.cards));
    let total = hands.map((x, i) => x.bid * (i + 1)).reduce((a,b) => a + b, 0);
    terminal.textContent = `Total winnings are ${total}`;
}
