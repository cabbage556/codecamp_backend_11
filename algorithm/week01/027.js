// **027. 가장 큰 수 찾기**

// **`문제 설명`**
// str은 무작위 숫자인 문자열입니다. 해당 문자열에서 가장 큰 수를 구하는 함수를 만들어야 합니다.
// 만약 str에 "12345"가 들어온다면 "5"를 나타내야 합니다.

// **`입력 인자`**
// - str은 문자열입니다.

// **`주의 사항`**
// - str에서 각각의 문자를 숫자로 바꿔서 계산해야 합니다.
// - 비교할 수 있는 기준값이 있어야 합니다.
// - 최댓값을 저장할 수 있는 변수가 있어야 합니다.

function bigNum(str) {
  // let biggest = str[0] * 1; // 문자에 1을 곱해서 문자를 숫자로 변환하기

  // for (const element of str) {
  //   if (biggest < element * 1) {
  //     biggest = element * 1;
  //   }
  // }

  // return biggest;

  str = str.split(""); // 문자열을 빈 문자열로 쪼개어 배열로 반환함
  return Math.max(...str); // ...[1, 2, 3, 4, 5] => 1, 2, 3, 4, 5
}

console.log(bigNum("12345")); // 5
console.log(bigNum("87135")); // 8
