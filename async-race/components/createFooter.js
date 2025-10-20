export default function createFooter() {
  const footer = document.createElement("footer")

  const container = document.createElement("div")
  container.classList.add("container")

  const footerText = document.createElement("p")
  footerText.classList.add("footer")
  footerText.innerText = "async race"

  container.append(footerText)
  footer.append(container)
  document.body.append(footer)
}