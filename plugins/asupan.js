let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, API('mel', '/asupan', {}, 'apikey'), 'asupan.mp4', '© 𝙉𝘼𝙉𝘿𝙃𝙐𝙆𝙐𝙏𝙏𝘼𝙉 𝙑1')
}
handler.help = ['asupan']
handler.tags = ['fun']
handler.command = /^(asupan)$/i

module.exports = handler
