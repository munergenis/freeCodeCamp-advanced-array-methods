const calculate = () => {
  const value = document.querySelector("#numbers").value
  const array = value.split(/,\s*/g)
  const numbers = array.map(el => Number(el)).filter(el => !Number.isNaN(el))

  const mean = getMean(numbers)
  const median = getMedian(numbers)
  const mode = getMode(numbers)
  const range = getRange(numbers)
  const variance = getVariance(numbers)
  const standardDeviation = getStandardDeviation(numbers)

  document.querySelector("#mean").textContent = mean
  document.querySelector("#median").textContent = median
  document.querySelector("#mode").textContent = mode
  document.querySelector("#range").textContent = range
  document.querySelector("#variance").textContent = variance
  document.querySelector("#standardDeviation").textContent = standardDeviation
}

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b)
  const isEven = array.length % 2 === 0

  if (isEven) {
    const firstNum = sorted[sorted.length / 2]
    const secondNum = sorted[(sorted.length / 2) - 1]
    return getMean([firstNum, secondNum])
  } else {
    return sorted[Math.floor(sorted.length / 2)]
  }
}

const getMode = (array) => {
  const counts = {}

  array.forEach(el => {
    if (counts[el]) {
      counts[el]++
    } else {
      counts[el] = 1
    }
  });
  
  if (new Set(Object.values(counts)).size === 1) {
    return null
  }

  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]
  const mode = Object.keys(counts).filter(el => counts[el] === counts[highest])

  return mode.join(", ")
}

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array)
}

const getVariance = (array) => {
  const mean = getMean(array)
  const differences = array.map(el => el - mean)
  const squaredDifferences = differences.map(el => el ** 2)
  const sumSquaredDifferences = squaredDifferences.reduce((acc, el) => acc + el, 0)
  
  const variance = array.reduce((acc, el) => {
    const difference = el - mean
    const squared = difference ** 2
    return acc + squared
  }, 0) / array.length
  
  return variance
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array)
  const standardDeviation = Math.sqrt(variance)

  return standardDeviation
}