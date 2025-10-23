export default function createModal() {
   const modal = document.createElement("div")
   modal.classList.add("modal")
   const modalText = document.createElement("h4")
   modalText.classList.add("modalText")
   modal.append(modalText)
   
   document.body.append(modal)
}