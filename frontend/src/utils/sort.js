/**
 * 
 * @param {*} arr - an array of list objects
 * @returns a new array sorted # - A - Z
 */
export const alphaSort = (arr) => {
  let newArr = arr.slice();
  return newArr.sort((a, b) => {
    let aN = a.list_name.toLowerCase();
    let bN = b.list_name.toLowerCase();

    if (aN > bN) {
      return 1;
    } else if (aN < bN) {
      return -1;
    } else {
      return 0;
    }
  });
};

/**
 * 
 * @param {*} arr - an array of list objects
 * @returns a new array sorted from oldest to newest
 */
export const dateSortOldest = (arr) => {
  let newArr = arr.slice();
  return newArr.sort((a, b) => {
    let aN = a.created_at
    let bN = b.created_at

    if (aN > bN) {
      return 1;
    } else if (aN < bN) {
      return -1;
    } else {
      return 0;
    }
  });
};