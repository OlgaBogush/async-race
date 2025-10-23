import {
  driveEngine,
  driveEngineForRace,
  getCar,
  getCars,
  startEngine,
  stopEngine,
} from "../async.js"

export default async function race() {
  const carsCollection = document.querySelectorAll(".car")
  const buttonRace = document.querySelector(".button-race")
  const buttonReset = document.querySelector(".button-reset")

  buttonRace.addEventListener("click", async (e) => {
    e.preventDefault()
    const array = []
    const cars = await getCars()
    cars.forEach((item) => array.push(item.id))

    const startArray = await Promise.all(array.map((item) => startEngine(item)))

    startArray.forEach(({ id, res }) => {
      const time = (res.distance / res.velocity / 1000).toFixed(2)
      const carElement = document.getElementById(id)
      carElement.style.animation = "move"
      carElement.style.animationDuration = `${time}s`
      carElement.style.animationTimingFunction = "linear"
      carElement.style.animationFillMode = "forwards"

    
    })

    // first
    const first = await Promise.any(
      array.map((item) => driveEngineForRace(item))
    )
      .then((data) => data)
      .catch((err) => {
        console.log(err)
      })

      if(first) {
        console.log("first", first);
      }


    // carsCollection.forEach(async (item) => {
    //   const carId = item.getAttribute("id")
    //   const fire = document.getElementById(`fire-${carId}`)
    //   const { velocity, distance } = await startEngine(carId)
    //   const time = (distance / velocity / 1000).toFixed(2)
    //   item.style.animation = "move"
    //   item.style.animationDuration = `${time}s`
    //   item.style.animationTimingFunction = "linear"
    //   item.style.animationFillMode = "forwards"

    //   const isSuccees = await driveEngine(carId)

    //   if (!isSuccees) {
    //     item.style.animationPlayState = "paused"
    //     fire.style.display = "block"
    //   }

    // })
  })

  // buttonReset.addEventListener("click", (e) => {
  //   e.preventDefault()
  //   carsCollection.forEach(async (item) => {
  //     const carId = item.getAttribute("id")
  //     const fire = document.getElementById(`fire-${carId}`)
  //     item.style.animation = ""
  //     fire.style.display = "none"
  //     await stopEngine(carId)
  //   })
  // })
}
