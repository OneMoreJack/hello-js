const {
  bubble,
  select,
  insert,
  binaryInsert,
  heapSort,
  mergeSort,
  mergeSortBu,
  hellSort,
  countingSort,
} = require("../sort");

const getTestFunc = (func) => {
  return () => {
    expect(func([9, 5, 2, 8, 1, 7])).toEqual([1, 2, 5, 7, 8, 9]);
    expect(func([1, 0, 9, 12, 4, 9, 6])).toEqual([0, 1, 4, 6, 9, 9, 12]);
    expect(func([13, 24, 0, 6, 88, 2, 36])).toEqual([0, 2, 6, 13, 24, 36, 88]);
    expect(func([2, 1, 0, 1])).toEqual([0, 1, 1, 2]);
  };
};

describe("排序", () => {
  it("冒泡排序", getTestFunc(bubble));
  it("选择排序", getTestFunc(select));
  it("插入排序", getTestFunc(insert));
  it("插入排序:二分", getTestFunc(binaryInsert));
  it("堆排序", getTestFunc(heapSort));
  it("归并排序", getTestFunc(mergeSort));
  it("归并排序:自底而上", getTestFunc(mergeSortBu));
  it("希尔排序", getTestFunc(hellSort));
  it("计数排序", getTestFunc(countingSort));
});
