export default function stopAnimation(id) {
  const fire = document.getElementById(`fire-${id}`)
  const carElement = document.getElementById(id)
  carElement.style.animationPlayState = "paused"
  fire.style.display = "block"
}