let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `Tidak ada absen berlangsung!`.trim(), 'ππΌππΏπππππππΌπ π1', 'Mulai', `${usedPrefix}mulaiabsen`, m)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `β ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
Tanggal: ${date}

${conn.absen[id][2]}
    
βγ *Absen* γ 
β Total: ${absen.length}
${list} 
βββββ`.trim()
    await conn.send2Button(m.chat, caption, 'ππΌππΏπππππππΌπ π1', 'Hadir', `${usedPrefix}absen`, 'Hapus', `${usedPrefix}-absen`, m)
}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i

module.exports = handler
