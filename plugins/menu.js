let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
  ã ðð¼ðð¿ððððððð¼ð ð1 ã
âªHai, %name!
âªUptime: *%uptime (%muptime)*
âªDeveloper:ððððððð ððð
%readmore`.trimStart(),
  header: '*[ %category ]*',
  body: 'â° %cmd %islimit %isPremium',
  footer: '\n*[ á´á´Êá´ Òá´á´á´á´Êá´s á´á´á´á´ÉªÉ´É¢ sá´á´É´ ]*\n',
  after: `
*á´Êá´É´á´ Êá´á´ Òá´Ê á´sÉªÉ´É¢ á´Êá´ Êá´á´ð¦*
*Êá´á´á´ Êá´á´ á´Êá´ á´É´á´á´ÊÉªÉ´É¢ð¦*
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'shellajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'textpro', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Main',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'shell': 'shell Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'textpro': 'Textpro',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'shellajaib') tags = {
    'shell': 'shell Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `      ð® ðð¼ðð¿ððððððð¼ð ð1 ð®\n\â­ââ\n\ââ Version: v1 \n\ââ Library: Baileys\n\ââ Runtime: ${uptime} \n\â°â\n\â­ââ­ ã INFO USER ã\n\â ð¤ Name: ${name} \n\â ð Total Features : 100+\n\â â ï¸ Limit: ${limit} \n\â ðï¸ Date: ${date} \n\â ð° Exp: ${exp} \n\â ð Level: ${level} \n\â ð® Role: ${role} \n\â ð Storage: 106/128 Gb \n\â°â­\n\â­â âã INFORMATION ãâââ\n\â This bot is still in testing stage\n\â if there is a bug \ error please\n\â report it to the owner\n\â\n\â°â`.trim(),
          "description": "á´á´É´á´ sá´á´á´",
          "buttonText": "Click Here",
          "footerText": "á´á´á´ á´Êá´á´á´á´ ÊÊ á´á´á´á´Ê-á´á´Êá´",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `ðð¥ð¥ ðð¨ð¦ð¦ðð§ðð¬`,
                  "description": "",
                  "rowId": `${_p}? all`
                }, {
                  "title": "ððð¦ð ðð¨ð¦ð¦ðð§ðð¬",
                  "description": "",
                  "rowId": `${_p}? game`

                }, {
                  "title": "ðð",
                  "description": "",
                  "rowId": `${_p}? xp`

                }, {
                  "title": "ðð­ð¢ðð¤ðð«",
                  "description": "",
                  "rowId": `${_p}? stiker`
                }, {
                  "title": "ððð ð¢ð ðð¡ðð¥ð¥",
                  "description": "",
                  "rowId": `${_p}? shellajaib`
                }, {
                  "title": "ðð¨ð®ð­ðð¬",
                  "description": "",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "ððð¦ð¢ð§",
                  "description": "",
                  "rowId": `${_p}? admin`
                }, {
                  "title": "ðð«ð¨ð®ð©",
                  "description": "",
                  "rowId": `${_p}? grup`
                }, {
                  "title": "ðð«ðð¦ð¢ð§ð®ð¦",
                  "description": "",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "ðð§ð­ðð«ð§ðð­",
                  "description": "",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "ðð§ð¨ð§ð²ð¦ð¨ð®ð¬",
                  "description": "",
                  "rowId": `${_p}? anonymous`
                }, {
                  "title": "ðð®ð¥ð¢ð¬ ððð ðð¨ð ð¨",
                  "description": "",
                  "rowId": `${_p}? nulis`
                }, {
                  "title": "ðð¨ð°ð§ð¥ð¨ðððð«",
                  "description": "",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "ðð¨ð¨ð¥ð¬",
                  "description": "",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "ðð®ð§",
                  "description": "",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "ððð­ðððð¬ð",
                  "description": "",
                  "rowId": `${_p}? database`
                }, {
                  "title": "ðð¨ð­ð ððð ððð¬ðð§",
                  "description": "",
                  "rowId": `${_p}? vote`
                }, {
                  "title": "ðð¨ð ð¨ ððð¤ðð«",
                  "description": "",
                  "rowId": `${_p}? textpro`
                }, {
                  "title": "ðð®ðð¢ð¨ ðð¨ð¦ð¦ðð§ðð¬",
                  "description": "",
                  "rowId": `${_p}? audio`
                }, {
                  "title": "ðððð¢ ðð¨ð­",
                  "description": "",
                  "rowId": `${_p}? jadibot`
                }, {
                  "title": "ðð§ðð¨",
                  "description": "",
                  "rowId": `${_p}? info`
                }, {
                  "title": "ððð§ð©ð ððð­ðð ð¨ð«ð²",
                  "description": "",
                  "rowId": `${_p}? tanpakategori`
                }, {
                  "title": "ðð°ð§ðð«",
                  "description": "",
                  "rowId": `${_p}? owner`
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // âã DAFTAR MENU ã
    // â ${_p + command} all
    // â ${_p + command} game
    // â ${_p + command} xp
    // â ${_p + command} stiker
    // â ${_p + command} shell
    // â ${_p + command} quotes
    // â ${_p + command} admin
    // â ${_p + command} group
    // â ${_p + command} premium
    // â ${_p + command} internet
    // â ${_p + command} anonymous
    // â ${_p + command} nulis
    // â ${_p + command} downloader
    // â ${_p + command} tools
    // â ${_p + command} fun
    // â ${_p + command} database
    // â ${_p + command} vote
    // â ${_p + command} quran
    // â ${_p + command} audio
    // â ${_p + command} jadibot
    // â ${_p + command} info
    // â ${_p + command} tanpa kategori
    // â ${_p + command} owner
    // âââââ  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), 'á´á´á´á´ á´¡Éªá´Ê â¤ï¸ ÊÊ á´á´á´á´Ê', 'á´¡Êá´ Éªs á´Êá´ á´á´¡É´á´Êð¯', `${_p}owner`, 'É¢Éªá´', `${_p}git`, m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry,The bot is not responding', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  res = "Good Morning ð"
  if (time >= 4) {
    res = "Good Morning ð"
  }
  if (time > 10) {
    res = "Good afternoon ð"
  }
  if (time >= 15) {
    res = "Good Evening ð"
  }
  if (time >= 18) {
    res = "Good Night ð"
  }
  return res
}
