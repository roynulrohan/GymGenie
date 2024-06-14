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

    for (const plateWeight of Object.keys(plates)
        .map(Number)
        .sort((a, b) => b - a)) {
        let count = 0;
        while (remainingWeight >= plateWeight && plates[plateWeight] > 0) {
            remainingWeight -= plateWeight;
            plates[plateWeight]--;
            count++;
        }
        if (count > 0) {
            result[plateWeight.toString()] = count;
        }
    }

    if (remainingWeight > 0) {
        return {};
    }

    // Reset the plates after calculation
    Object.keys(plates).forEach((plateWeight) => {
        plates[Number(plateWeight)] = 10;
    });

    return result;
};
