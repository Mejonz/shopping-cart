export function calcItemsInCart(arraytoCheck) {
    let count = 0;
    for (let i = 0; i < arraytoCheck.length; i++) {
        count += arraytoCheck[i].amount;
    }
    return count;
}

export function removeItemFromArray(targetItem, targetArray) {
    const newList = targetArray.filter(item => item.id !== targetItem.id);
    return newList;
}