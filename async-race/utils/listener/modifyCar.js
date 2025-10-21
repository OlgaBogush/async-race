import createCars from "../../components/createCars.js"
import { createCar, deleteCar } from "../async.js"

export default function modifyCar() {
  // delete car
  const smallButtonsCollection = document.querySelectorAll(".small-button")
  smallButtonsCollection.forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.preventDefault()
      const carId = parseInt(e.target.id.split("-").at(-1))

      if (e.target.classList.contains("small-button-remove")) {
        console.log("removing...", carId)
        await deleteCar(carId)
      }
    })
  })

  // create car
  const inputTextCreate = document.querySelector(".input-text-create")
  const inputColorCreate = document.querySelector(".input-color-create")
  const createForm = document.querySelector(".create-form")

  createForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const car = {
      name: inputTextCreate.value,
      color: inputColorCreate.value
    }
    await createCar(car)
  })
}
