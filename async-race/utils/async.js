const BASE_URL = "http://127.0.0.1:3000"

export async function getCars() {
  const response = await fetch(`${BASE_URL}/garage`)
  const res = await response.json()
  return res
}

export async function getCar(id) {
  const response = await fetch(`${BASE_URL}/garage/${id}`)
  const res = await response.json()
  // console.log(res)
  return res
}

export async function deleteCar(id) {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "DELETE",
  })
  const res = await response.json()
  return res
}

export async function createCar(car) {
  const response = await fetch(`${BASE_URL}/garage/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
  const res = await response.json()
  console.log("create", res)
  return res
}

export async function updateCar(id, updateParams) {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateParams),
  })
  const res = await response.json()
  console.log("update", res)
  return res
}

export async function startEngine(id) {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
    method: "PATCH",
  })
  const res = await response.json()
  return res
}

export async function driveEngine(id) {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
    method: "PATCH",
  })
  if (response.status == 400) {
    console.log("BAD REQUEST")
    return false
  } else if (response.status == 404) {
    console.log("NOT FOUND")
    return false
  } else if (response.status == 429) {
    console.log("TOO MANY REQUESTS")
    return false
  } else if (response.status == 500) {
    console.log("INTERNAL SERVER ERROR")
    return false
  } else {
    console.log("true");
    return true
  }
}

export async function stopEngine(id) {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
    method: "PATCH",
  })
  const res = await response.json()
  console.log("stopped", res)
  return res
}
