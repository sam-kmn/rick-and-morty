const secureFetch = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) return [null, response.statusText]
    const data = await response.json()
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}

export default secureFetch
