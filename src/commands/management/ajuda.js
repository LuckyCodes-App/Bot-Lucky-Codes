const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow} = require('discord.js')
const cor = require('../../../cores.json')

module.exports = {

name: 'ajuda',
description: 'Exibe meu painel de ajuda.',
type: ApplicationCommandType.ChatInput,

run: async (client, interaction, args) => {

    let embed = new EmbedBuilder()
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle(`Ajuda do ${client.user.username}`)
    .setDescription(`Olá, sou um bot de Slash Commands, então meu prefixo é \`/\`
    
    👑 | **Comandos da Gerência:**
    \`eval\` \`lock\` \`unlock\` \`clear\` \`captcha\` \`setstatus\`
    
    🛡️ | **Comandos de Moderação:**
    \`punir\` \`despunir\`

    📌 | **Comandos Úteis:**
    \`userinfo\` \`ajuda\` \`ping\` \`serverinfo\` \`status\`
    
`)
    .setColor(cor.Cores.Padrão)

interaction.reply({ embeds: [embed]})
}
}