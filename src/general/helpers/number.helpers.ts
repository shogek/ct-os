export function getRandomNumberBetween(min: number, max: number) {
   return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomId() {
   return Math.random().toString(16).slice(2).toString()
}
