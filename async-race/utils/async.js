export async function getCars() {
  const response = await fetch("http://127.0.0.1:3000/garage")
  const res = await response.json()
  return res
}

export async function getCar(id) {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`)
  const res = await response.json()
  return res
}

export async function deleteCar(id) {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "DELETE",
  })
  const res = await response.json()
  return res
}

export async function createCar(car) {
  const response = await fetch(`http://127.0.0.1:3000/garage/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(car),
  })
  const res = await response.json()
  console.log(res)
  return res
}
