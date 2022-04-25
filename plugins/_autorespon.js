let fs = require('fs')
let handler = m => m

handler.all = async function (m, { conn, isBlocked }) {

    if (isBlocked || m.fromMe || m.chat.endsWith('broadcast')) return
    let set = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag 
    if (m.isGroup) {
        if (m.mentionedJid.includes(this.user.jid)) {
            await this.send2Button(m.chat,
                isBanned ? 'Nandhukuttan not active' : banned ? 'you are banned' : 'Nandhukuttan active',
                '𝙉𝘼𝙉𝘿𝙃𝙐𝙆𝙐𝙏𝙏𝘼𝙉 𝙑1',
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(m.chat, `┌「 *Invite Bot to Group* 」
 Hi ${name}
 Want to add bot to your group??

Type .join and paste the link
`.trim(), '𝙉𝘼𝙉𝘿𝙃𝙐𝙆𝙐𝙏𝙏𝘼𝙉 𝙑1', 'Git', ',git', m)
    }


    // backup db
    if (set.backup) {
        if (new Date() * 1 - set.backupTime > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            set.backupTime = new Date() * 1
        }
    }

    // update status
    if (set.autoupdatestatus) {
        if (new Date() * 1 - set.status > 1000) {
            let _uptime = process.uptime() * 1000
            let uptime = conn.clockString(_uptime)
            await this.setStatus(`Active during ${uptime} | Mode: ${set.self ? 'Private' : set.group ? 'Group Only' : 'Publik'} | Nandhukuttan V1 by Benison as Achu`).catch(_ => _)
            set.status = new Date() * 1
        }
    }

}

module.exports = handler 
