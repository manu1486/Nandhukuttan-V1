let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, API('mel', '/asupan', {}, 'apikey'), 'asupan.mp4', 'Β© ππΌππΏπππππππΌπ π1')
}
handler.help = ['asupan']
handler.tags = ['fun']
handler.command = /^(asupan)$/i

module.exports = handler
