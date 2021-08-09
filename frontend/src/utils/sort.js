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

const testAlpha = [
  { list_name: "first", created_at: "2021-07-21T18:43:34.891Z" },
  { list_name: "Apple", created_at: "2021-07-21T18:43:34.891Z" },
  { list_name: "Ban", created_at: "2021-07-21T18:43:34.891Z" },
  { list_name: "apple", created_at: "2021-07-21T18:43:34.893Z" },
  { list_name: "second", created_at: "2021-07-21T18:43:34.894Z" },
  { list_name: "#", created_at: "2021-07-21T18:43:34.893Z" },
  { list_name: "42fsa", created_at: "2021-07-21T18:43:34.894Z" },
];

const testDates = [
  { list_name: "4", created_at: "2021-08-09T15:55:54.978Z" },
  { list_name: "2", created_at: "2021-08-06T20:25:52.313Z" },
  { list_name: "1", created_at: "2021-08-04T16:47:56.348Z" },
  { list_name: "3", created_at: "2021-08-09T15:55:28.424Z" },
];

// console.log("sorting results...", dateSortOldest(testDates))
// console.log("sorting original...", testDates)
