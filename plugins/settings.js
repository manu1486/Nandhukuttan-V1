let fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let haruno = `â ã ðððð / ðððððã
    á´ÊÉªá´á´ á´É´ á´Êá´ Êá´Êá´á´¡ Êá´á´á´á´É´s á´á´ á´á´á´É´ á´Ê á´Êá´sá´ á´Êá´ É¢Êá´á´á´ð
`.trim()
    await conn.send2ButtonLoc(m.chat, await (await fetch("https://telegra.ph/file/aeffa4c9d7b9f8f3a265b.jpg")).buffer(), haruno, 'Â© á´á´á´á´Ê-á´á´Êá´', 'á´á´á´É´', '.grup open', 'á´Êá´sá´', '.grup close', m)
}
handler.tags = ['grup']
handler.help = ['open/close']
handler.command = /^(settings)$/i
module.exports = handler
