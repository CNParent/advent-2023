scripts.day7_2 = async () => {
    const cardScores = {
        A: 13,
        K: 12,
        Q: 11,
        T: 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
        J: 1,
    };

    const handKinds = {
        five: 7,
        four: 6,
        house: 5,
        three: 4,
        twoPair: 3,
        pair: 2,
        highCard: 1
    };

    function parseHand(text) {
        let parts = text.split(' ');
        let cards = parts[0].split('');
        let groups = group(cards);
        let jokers = cards.filter(c => c == 'J').length;
        let hand = { text, kind: 0, cards, groups, jokers, bid: Number(parts[1]) };
        hand.kind = getHandKind(hand);
        return hand;
    }

    let data = await getFile('day7/input.txt');
    let hands = data.split('\r\n').map(parseHand);

    function group(cards) {
        let groups = [];
        cards.forEach(card => {
            if (card == 'J') return;

            let group = groups.find(g => g.card == card);
            if (!group) groups.push({ card, count: 1 });
            else group.count++;
        });

        return groups;
    }

    function getHandKind(hand) {
        if (isFive(hand.groups, hand.jokers)) return handKinds.five;
        if (isFour(hand.groups, hand.jokers)) return handKinds.four;
        if (isFullHouse(hand.groups, hand.jokers)) return handKinds.house;
        if (isThree(hand.groups, hand.jokers)) return handKinds.three;
        if (isTwoPair(hand.groups)) return handKinds.twoPair;
        if (isPair(hand.groups, hand.jokers)) return handKinds.pair;
        return handKinds.highCard;
    }

    function isFive(groups, jokers) {
        return groups.find(g => g.count == 5 - jokers) != null || jokers == 5;
    }

    function isFour(groups, jokers) {
        return groups.find(g => g.count == 4 - jokers) != null;
    }

    function isFullHouse(groups, jokers) {
        return (groups.find(g => g.count == 3) != null &&
            groups.find(g => g.count == 2) != null) ||
            (groups.filter(g => g.count == 2).length == 2 && jokers == 1);
    }

    function isThree(groups, jokers) {
        return groups.find(g => g.count == 3 - jokers) != null;
    }

    function isTwoPair(groups) {
        return groups.filter(g => g.count == 2).length == 2;
    }

    function isPair(groups, jokers) {
        return groups.filter(g => g.count == 2).length == 1 || jokers == 1;
    }

    function compareHands(a, b) {
        let diff = a.kind - b.kind;
        for(let i = 0; diff == 0 && i < a.cards.length; i++) {
            diff = cardScores[a.cards[i]] - cardScores[b.cards[i]];
        }

        return diff;
    }

    hands.sort((a,b) => compareHands(a, b));
    let total = hands.map((x, i) => x.bid * (i + 1)).reduce((a,b) => a + b, 0);
    terminal.textContent = `Total winnings are ${total}`;
}
