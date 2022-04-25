let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let ar = ['dog', 'cat', 'panda', 'fox', 'red_panda', 'koala', 'bird', 'raccoon', 'kangaroo']
  let er = `
┌「 *List* 」
${ar.map(v => '├ ' + v).join`\n`}
└────

Example:
${usedPrefix}${command} panda
`.trim()
  if (!text) throw er
  if (!ar.includes(text)) throw er
  let res = await fetch(
    API('https://some-random-api.ml', '/animal/' + text)
  )
  if (!res.ok) throw `${res.status} ${res.statusText}`
  let json = await res.json()
  if (!json.image) throw json
  conn.sendFile(m.chat, json.image, '', `${json.fact}\n\n© 𝙉𝘼𝙉𝘿𝙃𝙐𝙆𝙐𝙏𝙏𝘼𝙉 𝙑1`, m)
}
handler.help = ['animal'].map((v) => v + ' <opsi>')
handler.tags = ['internet']
handler.command = /^(animal|animalfact)$/i

module.exports = handler
