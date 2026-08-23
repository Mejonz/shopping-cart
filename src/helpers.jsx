export function calcItemsInCart(arraytoCheck) {
    let count = 0;
    for (let i = 0; i < arraytoCheck.length; i++) {
        count += arraytoCheck[i].amount;
    }
    return count;
}

