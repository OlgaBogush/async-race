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
      carElement.style.animationName = "move"
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
      const flagWin = carElementWin.nextElementSibling
      flagWin.style.animationName = "shake"
      flagWin.style.animationDuration = "0.5s"
      flagWin.style.animationIterationCount = 1

      const name = carElementWin.getAttribute("data-name")
      const time = carElementWin.getAttribute("data-time")
      const modal = document.querySelector(".modal")
      const modalText = modal.querySelector(".modalText")
      modalText.textContent = `${name} wins by ${time} s!`
      modal.classList.add("show")
      document.body.style.overflow = "hidden"
      console.log("first", first);

      // hide modal
      modal.addEventListener("click", () => {
        modal.classList.remove("show")
        modalText.textContent = ""
        document.body.style.overflow = ""
      })
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
