import { driveEngine, getCars, startEngine, stopEngine } from "../async.js"

export default async function race() {
  const buttonRace = document.querySelector(".button-race")
  const buttonReset = document.querySelector(".button-reset")

  const array = []
  const cars = await getCars()
  cars.forEach((item) => array.push(item.id))

  // race
  buttonRace.addEventListener("click", async (e) => {
    e.preventDefault()

    const startArray = await Promise.all(array.map((item) => startEngine(item)))
    startArray.forEach(({ id, res }) => {
      const time = (res.distance / res.velocity / 1000).toFixed(2)
      const carElement = document.getElementById(id)
      carElement.dataset.time = time
      carElement.style.animation = "move"
      carElement.style.animationDuration = `${time}s`
      carElement.style.animationTimingFunction = "linear"
      carElement.style.animationFillMode = "forwards"
    })

    // first
    const first = await Promise.any(array.map((item) => driveEngine(item)))
      .then((data) => data)
      .catch((err) => {
        console.log(err)
      })

    if (first) {
      const carElementWin = document.getElementById(first.id)
      const name = carElementWin.getAttribute("data-name")
      const time = carElementWin.getAttribute("data-time")
      console.log(`${name} wins by ${time} s!`);
    }
  })

  // reset
  buttonReset.addEventListener("click", (e) => {
    e.preventDefault()
    array.forEach(async (item) => {
      const carElement = document.getElementById(item)
      const fire = document.getElementById(`fire-${item}`)
      carElement.style.animation = ""
      fire.style.display = "none"
      await stopEngine(item)
    })
  })
}
