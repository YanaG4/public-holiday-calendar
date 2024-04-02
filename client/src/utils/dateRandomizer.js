export const generatePlusMinusNumber = (num = 10) => {
    const different = num * 2 + 1;
    return Math.floor(Math.random() * different) - num;
}

export function getRandomDate() {
    const currentDate = new Date();
    const plusMinus10Days = generatePlusMinusNumber(); // some random number between -10 and 10

    const randomizedDate = new Date(currentDate.setDate(currentDate.getDate() + plusMinus10Days));

    return randomizedDate;
}

export function getFormatedDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

export function randomHoliday() {
    return getFormatedDate(getRandomDate());
}
