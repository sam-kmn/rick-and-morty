export const secureFetch = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) return [null, response.statusText]
    const data = await response.json()
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}

export const splitToChunks = (data: any[], chunkSize = 5) => {
  const chunks = []
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  return chunks
}
