const numbers = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(numbers);

numbers.forEach((num: number, index: number) => {
  const double = num * 2;
  console.log(`${index}: ${double}`);
});

const names = ["Alice", "Bob", "Charlie"];
const users = names.map((name: string, i: number) => {
  return {
    id: i,
    name: name,
  };
});
console.log(users);

// 偶数のIDのユーザーを取得
const evenIdUsers = users.filter((user: { id: number; name: string }) => {
  return user.id % 2 === 0;
});
console.log(evenIdUsers);

// 文法省略ver 奇数のIDのユーザーを取得
const oddIdUsers = users.filter(
  (user: { id: number; name: string }) => user.id % 2 === 1
);
console.log(oddIdUsers);

// 配列の合計を計算
const sum = numbers.reduce(
  (previous: number, current: number): number => previous + current,
  0
);
console.log(sum);
