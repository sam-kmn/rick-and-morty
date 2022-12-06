const splitToChunks = (data: any[], chunkSize = 5) => {
  const chunks = []
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  return chunks
}

export default splitToChunks
