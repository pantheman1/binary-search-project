/*******************************************************************
While you are working on the following problems, it DEFINITELY HELPS to
visualize these things in action, so use the below arrays as example inputs.

[1, 2, 3, 4, 5, 6, 7, 8, 9]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*******************************************************************/

/*******************************************************************
BINARY SEARCH VERSION 1:

Write a Recursive Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/

const recurBSearch = (nums, targetNum) => {
  // Base Case: if nums has no length, return false because we've run out of items to search and haven't found targetNum
  if (nums.length === 0) return false;

  // determine the slice point (ie the 'middle' of the array).
  let middle;
  if (nums.length % 2 === 0) {
    middle = nums.length / 2;
    //console.log(middle);
  } else {
    middle = (nums.length - 1) / 2;
    // console.log(middle);
  }
  // console.log(middle);
  // create "left half" and "right half" arrays, not including the slice point.
  let leftHalf = nums.slice(0, middle);
  let rightHalf = nums.slice(middle + 1);
  // console.log(leftHalf);
  // console.log(rightHalf);
  // console.log(middle)

  // if targetNum is less than the value in the array at slice point,
  // return this search on the left half
  if (targetNum < nums[middle]) return recurBSearch(leftHalf, targetNum);

  // if targetNum is greater than the value in the array at slice point,
  //return this search on the right half
  if (targetNum > nums[middle]) return recurBSearch(rightHalf, targetNum);

  // if it's not greater than or less than (i.e. 'else'),
  // we know it's equal so return true
  if (targetNum === nums[middle]) return true;
};
// let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let arr2 = [1, 2, 3, 4, 5];
// console.log(recurBSearch(arr2, 3));

//console.log(arr1.indexOf(arr1.length / 2));
/*******************************************************************
BINARY SEARCH VERSION 2:

Write an Iterative Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/

const iterBSearch = (nums, targetNum) => {
  // Save references to indices at the beginning, middle, and end of the array into variables: lowerIdx, midIdx, and upperIdx
  let lowerIdx = nums[0];
  let upperIdx = nums[nums.length - 1];
  let midIdx;
  if (nums.length % 2 === 0) {
    midIdx = nums.length / 2;
  } else {
    midIdx = (nums.length - 1) / 2;
  }
  // while the lowerIdx is less than or equal to the upperIdx, there are still
  // values to be searched
  while (lowerIdx <= upperIdx) {
    // reassign the midIdx to the the middle of the new lower and upper indices
    // Hint: This is the sum between lower and upper, divided by 2
    midIdx = (lowerIdx + upperIdx) / 2;
    // if targetNum is larger than the value in the middle, we know targetNum is
    // not between the current lower and current middle, so reassign the lowerIdx
    // to the middle (ie cut off the left half of the array)
    if (targetNum > midIdx) {
      lowerIdx = midIdx;
      // if targetNum is less than the value in the middle, we know targetNum is not
      // between the current upper and current middle, so reassign the upperIdx
      // to the middle (ie cut off the right half of the array)
    }
    if (targetNum < midIdx) {
      upperIdx = midIdx;
      // if it's not greater than or less than (ie 'else'), we have found our target
      // at the midIdx and can return true and stop iterating.
    }
    if (targetNum === midIdx) {
      return true;
    } else {
      return false;
    }
  }
};
// if we finish our while loop and haven't returned true, we've looked over
// the entire array and didn't find targetNum, so return false

// console.log(iterBSearch([1, 2, 3]));

/*******************************************************************
BINARY SEARCH VERSION 3:

Write a Recursive Binary Search that returns the Index value of targetNum if it
is in the nums array, and -1 if it is not found.
*******************************************************************/

const recurBSearchIdx = (nums, targetNum) => {
  // this implementation is identical to version 1, except rather than
  // returning true/false, return the index where you found the item
  // (instead of true) or -1 (instead of false).
  // HINT: the index value you return should be the index in the ORIGINAL array
  // and not the index of the sliced array. You'll notice this problem arise
  // on the 'right half' recursion. in that, try saving the return value of the
  // recursive call into a variable, and adding it to the current stack-frame's
  // midIdx + 1.

  // Base Case: if nums has no length, return false because we've run out of items to search and haven't found targetNum
  if (nums.length === 0) return -1;

  // determine the slice point (ie the 'middle' of the array).
  let middle;
  if (nums.length % 2 === 0) {
    middle = nums.length / 2;
  } else {
    middle = (nums.length - 1) / 2;
  }
  // create "left half" and "right half" arrays, not including the slice point.
  let leftHalf = nums.slice(0, middle);
  let rightHalf = nums.slice(middle + 1);

  // if targetNum is less than the value in the array at slice point,
  // return this search on the left half
  if (targetNum < nums[middle]) return recurBSearchIdx(leftHalf, targetNum);

  // if targetNum is greater than the value in the array at slice point,
  //return this search on the right half
  if (targetNum > nums[middle]) {
    let rightHalfResults = recurBSearchIdx(rightHalf, targetNum);
    return rightHalfResults + middle + 1;
  }

  // if it's not greater than or less than (i.e. 'else'),
  // we know it's equal so return true
  if (targetNum === nums[middle]) return middle;
};

// let arr2 = [1, 2, 3, 4, 5];
// console.log(recurBSearchIdx(arr2, 5));
/*******************************************************************
BINARY SEARCH VERSION 4:

Write a Recursive Binary Search that returns the Index value of targetNum if it
is in the nums array, and -1 if it is not found.
*******************************************************************/

const recurBSearchIdxV2 = (nums, targetNum, low = 0, hi = nums.length - 1) => {
  //This implementation is recursive, but borrows the low/hi logic from Version 2 to establish a different base case. Rather than shrinking the array until its length is 0, this implementation moves low and hi indices to determine what part of the original array is being searched. if they meet each other we know we have searched the entire array.(NOTE this function has FOUR params)

  //Base Case: 
  //if low is equal to high and we haven't found targetNum, then return -1 to indicate that the value was not found.
  if (low === hi && nums[low] !== targetNum) return -1;

  //Determine the slice point (the sum between low and hi, divided by 2)
  let midIdx = (hi + low) / 2;

  //If targetNum is less than nums[slicepoint], then return the binary search of nums where low is the beginning of the array, and hi is the middle of the array
  if (targetNum < nums[midIdx]) return recurBSearchIdxV2(nums, targetNum, low, midIdx);

  //If targetNum is less than nums[slicepoint], then return the binary search of nums where low is the middle of the array, and hi is the end of the array 
  if (targetNum > nums[midIdx]) return recurBSearchIdxV2(nums, targetNum, midIdx + 1, hi);

  //If it's not greater and not less (i.e. 'else'), return the slice point because we have found our value!
  else {
    return midIdx;
  }
};

let arr2 = [1, 2, 3, 4, 5];
console.log(recurBSearchIdx(arr2, 55));
/*******************************************************************
BINARY SEARCH VERSION 5:

Write an Iterative Binary Search that returns the Index value of targetNum if
it is in the nums array, and -1 if it is not found.
*******************************************************************/

const iterBSearchIdx = (nums, targetNum) => {
  // this is identical to Version 2, but return the index or -1 rather than
  // true or false
};

module.exports = {
  recurBSearch,
  iterBSearch,
  recurBSearchIdx,
  recurBSearchIdxV2,
  iterBSearchIdx,
};
