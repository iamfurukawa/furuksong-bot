import fs from 'fs'

const LocalAudios = () => {

  const get = (folder) => {
    let audios = []

    fs.readdirSync(folder).forEach(file => {
      audios.push(file)
    })

    return audios
  }
  
  return {
    get
  }
}

export default LocalAudios()