const HOST = 'http://localhost:3001'

type ResDataType = {
  [key: string]: any
}

export const get = async (url: string) => {
  try {
    const res = await fetch(`${HOST}${url}`)
    const data = await res.json()
    return data as ResDataType
  } catch (error) {
    console.log('error', error)
  }
}

export const post = async (url: string, body: any) => {
  const res = await fetch(HOST + url, {
    method: 'post',
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data as ResDataType
}
