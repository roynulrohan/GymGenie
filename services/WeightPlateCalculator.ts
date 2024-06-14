interface Plates {
    [key: number]: number;
}

const plates: Plates = {
    45: 10,
    35: 10,
    25: 10,
    10: 10,
    5: 10,
    2.5: 10,
};

const barWeight = 45;

export const calculateWeightPlates = (weight: number): Record<string, number> => {
    let remainingWeight = (weight - barWeight) / 2;
    const result: Record<string, number> = {};

    const availablePlates = { ...plates };

    for (const plateWeight of Object.keys(availablePlates)
        .map(Number)
        .sort((a, b) => b - a)) {
        let count = 0;
        while (remainingWeight >= plateWeight && availablePlates[plateWeight] > 0) {
            remainingWeight -= plateWeight;
            availablePlates[plateWeight]--;
            count++;
        }
        if (count > 0) {
            result[plateWeight.toString()] = count;
        }
    }

    if (remainingWeight > 0) {
        return {};
    }

    return result;
};
