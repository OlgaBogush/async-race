export default function createHeader() {
  const header = document.createElement("header")

  const container = document.createElement("div")
  container.classList.add("container")

  const headerContainer = document.createElement("div")
  headerContainer.classList.add("header-container")

  const toGarageButton = document.createElement("button")
  toGarageButton.classList.add("to-garage-button")
  toGarageButton.innerText = "Garage"

  const toWinnersButton = document.createElement("button")
  toWinnersButton.classList.add("to-winners-button")
  toWinnersButton.innerText = "Winners"

  headerContainer.append(toGarageButton, toWinnersButton)
  container.append(headerContainer)
  header.append(container)
  document.body.append(header)
}
