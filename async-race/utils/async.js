const BASE_URL = "http://127.0.0.1:3000"

export async function getCars() {
  try {
    const response = await fetch(`${BASE_URL}/garage`)
    const res = await response.json()
    return res
  } catch (err) {
    throw new Error("Error")
  }
}

export async function getCar(id) {
  try {
    const response = await fetch(`${BASE_URL}/garage/${id}`)
    const res = await response.json()
    // console.log(res)
    return res
  } catch (err) {
    throw new Error("NOT FOUND")
  }
}

export async function deleteCar(id) {
  try {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: "DELETE",
    })
    const res = await response.json()
    return res
  } catch (err) {
    throw new Error("NOT FOUND")
  }
}

export async function createCar(car) {
  try {
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
  } catch (err) {
    throw new Error("Error")
  }
}

export async function updateCar(id, updateParams) {
  try {
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
  } catch (err) {
    throw new Error("NOT FOUND")
  }
}

export async function startEngine(id) {
  try {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
      method: "PATCH",
    })
    const res = await response.json()
    console.log("start")
    return { id, res }
  } catch (err) {
    throw new Error("NOT FOUND")
  }
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
  } else if (response.status == 200) {
    const res = await response.json()
    console.log("id:", id, res)
    return { id, res }
  }
}

export async function driveEngineForRace(id) {
  try {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
      method: "PATCH",
    })
    if (response.status == 400) {
      console.log("BAD REQUEST")
      return Promise.reject("BAD REQUEST")
    } else if (response.status == 404) {
      console.log("NOT FOUND")
      return Promise.reject("NOT FOUND")
    } else if (response.status == 429) {
      console.log("TOO MANY REQUESTS")
      return Promise.reject("TOO MANY REQUESTS")
    } else if (response.status == 500) {
      console.log("INTERNAL SERVER ERROR")
      return Promise.reject("INTERNAL SERVER ERROR")
    } else if (response.status == 200) {
      const res = await response.json()
      console.log("id:", id, res)
      return { id, res }
    }
  } catch (err) {
    throw new Error("some error")
  }
}

export async function stopEngine(id) {
  try {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
      method: "PATCH",
    })
    const res = await response.json()
    console.log("stopped", res)
    return res
  } catch (err) {
    throw new Error("NOT FOUND")
  }
}
