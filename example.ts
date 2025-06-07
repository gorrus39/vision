const permissions = {
  READ: 1 << 0,
  WRITE: 1 << 1,
  EXEC: 1 << 2,
  ADMIN: 1 << 18,
}

const fn = () => {
  for (const [key, value] of Object.entries(permissions)) {
    console.log(`key: ${key}, value: ${value}`)
  }
}

fn()
