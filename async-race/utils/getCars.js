const getCars = async () => {
  let response = await fetch("http://127.0.0.1:3000/garage")
  let res = await response.json()
  return res
}

export default getCars
