// const data = [
//   {
//     date: '2022-06-06',
//     orderNum: 60,
//     returnNum: 45
//   },
//   {
//     date: '2022-06-06',
//     orderNum: 60,
//     returnNum: 45
//   },
//   {
//     date: '2022-06-06',
//     orderNum: 60,
//     returnNum: 45
//   }

// ]

export function randomOrderData() {
  const data = []
  for (var i = 1; i < 31; i++) {
    data.push({
      date: `2022-06-${i}`,
      // 50-60
      orderNum: randomUum(50, 60),
      returnNum: randomUum(0, 30)
    })
  }

  return data
}

function randomUum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// console.log(randomOrderData())
