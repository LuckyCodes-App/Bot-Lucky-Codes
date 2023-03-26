const { EmbedBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType  } = require('discord.js');
const cor = require('../../../cores.json')

module.exports = {
  name: 'userinfo',
  description: 'ver informações de um usuário',
  options: [
    {
      name: 'usuario',
      description: 'usuario a ver as informações',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {

    const usuarioTest = interaction.options.getUser('usuario') || interaction.user;
    const acharUser = interaction.guild.members.cache.get(usuarioTest.id);

    const permsObj = {
      CreateInstantInvite: '\`Criar convite instantâneo\`',
      KickMembers: '\`Expulsar membros\`',
      BanMembers: '\`Banir membros\`',
      Administrator: '\`Administrador\`',
      ManageChannels: '\`Gerenciar canais\`',
      ManageGuild: '\`Gerenciar servidor\`',
      AddReactions: '\`Adicionar reações\`',
      ViewAuditLog: '\`Ver registro de auditoria\`',
      PrioritySpeaker: '\`Voz Prioritária\`',
      Stream: '\`Ao vivo\`',
      ViewChannel: '\`Ver canais\`',
      SendMessages: '\`Enviar mensagens\`',
      SendTTSMessages: '\`Enviar mensagens em tts\`',
      ManageMessages: '\`Gerenciar mensagens\`',
      EmbedLinks: '\`Enviar links\`',
      AttachFiles: '\`Enviar anexos\`',
      ReadMessageHistory: '\`Ver histórico de mensagens\`',
      MentionEveryone: '\`Mencionar everyone e cargos\`',
      UseExternalEmojis: '\`Usar emojis externos\`',
      UseExternalStickers: '\`Usar figurinhas externas\`',
      ViewGuildInsights: '\`Ver análises do servidor\`',
      Connect: "\`Conectar em call's\`",
      Speak: `\`Falar em call's\``,
      MuteMembers: `\`Mutar membros\``,
      DeafenMembers: `\`Ensurdecer membros\``,
      MoveMembers: `\`Mover membros\``,
      UseVAD: `\`Utilizar detecção de voz\``,
      ChangeNickname: `\`Alterar apelido\``,
      ManageNicknames: `\`Gerenciar apelidos\``,
      ManageRoles: `\`Gerenciar cargos\``,
      ManageWebhooks: `\`Gerenciar webhooks\``,
      ManageEmojisAndStickers: `\`Gerenciar emojis e figurinhas\``,
      UseApplicationCommands: `\`Utilizar comandos slashs (/)\``,
      RequestToSpeak: `\`Pedir para falar\``,
      ManageEvents: `\`Gerenciar eventos\``,
      ManageThreads: `\`Gerenciar threads\``,
      CreatePublicThreads: `\`Criar threads públicas\``,
      CreatePrivateThreads: `\`Criar threads privadas\``,
      SendMessagesInThreads: `\`Falar em threads\``,
      UseEmbeddedActivities: `\`Iniciar atividades\``,
      ModerateMembers: `\`Gerenciar moderação do servidor\``
  }

    const embedUser = new EmbedBuilder()
    .setAuthor({ name: `${usuarioTest.username}`})
    .setThumbnail(usuarioTest.displayAvatarURL({ dynamyc: true}))
    .setColor(cor.Cores.Padrão)
    .addFields(
      {
        name: `🧑🏻 | Nome`,
        value: `\`\`\`${usuarioTest.tag}\`\`\``,
        inline: true
      },
      {
        name: `<:id:1041850004563824680> | Identidade`,
        value: `\`\`\`${usuarioTest.id}\`\`\``,
        inline: true
      },
      {
        name: `📌 | Menção`,
        value: `<@${usuarioTest.id}>`,
        inline: true
      },
      {
        name: `📊 | Conta Criada`,
        value: `<t:${~~(usuarioTest.createdTimestamp / 1000)}:f> (<t:${~~(usuarioTest.createdTimestamp / 1000)}:R>)`,
        inline: false
      },
    )

    const botaoUser = new ButtonBuilder()
    .setLabel('Permissões do Membro')
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('verPerms')

    if(!acharUser) botaoUser.setLabel('Não encontrado no servidor'), botaoUser.setDisabled(true)
    if(acharUser) embedUser.addFields({
      name: `📜 | Entrou em`,
      value: `<t:${~~(acharUser.joinedTimestamp / 1000)}:f> (<t:${~~(acharUser.joinedTimestamp / 1000)}:R>)`,
      inline: false
    })

    const rowUser = new ActionRowBuilder().addComponents(botaoUser)

    let msgUser = await interaction.reply({ embeds: [embedUser], components: [rowUser], fetchReply: true})

    const coletorPerms = msgUser.createMessageComponentCollector({ componentType: ComponentType.Button, filter: (m) => m.member.id == interaction.user.id});

    coletorPerms.on("collect", async (interaction) => {
      if(interaction.customId === 'verPerms') {

        const permsArray = acharUser.permissions.toArray().map(p => permsObj[p])

        const embedPerms = new EmbedBuilder().setColor(cor.Cores.Padrão).addFields(
          {
            name: '⭐ | Maior Cargo',
            value: `${acharUser.roles.cache.sort((a, b) => b.position - a.position).first()}`,
            inline: false
          },
          {
            name: `<:eng:1041858254885634109> Permissões de ${usuarioTest.username}`,
            value: `${permsArray.join(', ')}`
          }
        )

        await interaction.reply({ embeds: [embedPerms], ephemeral: true})
      }
    })
  }  
};
    