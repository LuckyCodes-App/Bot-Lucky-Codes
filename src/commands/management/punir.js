const Discord = require('discord.js');
const cor = require('../../../cores.json')

module.exports = {
    name: "punir",
    description: "Pune um usuario do discord",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'Selecione um usuario',
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
        {
            name: 'motivo',
            description: 'Defina um motivo para punir o usuario',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {


        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `<:xx:1035315658814132345> | Ola ${interaction.user}, Você não tem permissão para utilizar esse comando`, ephemeral: true })
        } else {
            let user = interaction.options.getUser("usuario")
            let user2 = interaction.guild.members.cache.get(user.id)
            let motivo = interaction.options.getString("motivo")
            if (!motivo) motivo = "Não definido"
            if (!user) return interaction.reply({ content: 'Insira um ID ou usuário válido', ephemeral: true })

            let chat = interaction.guild.channels.cache.get("1046534511715962890")

            let ryan = new Discord.EmbedBuilder()
                .setColor(cor.Cores.Padrão)
                .setTitle(`${user.username} # ${user.discriminator} foi punido!`)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    {name: 'Autor:', value: `${interaction.user.tag}`},
                    {name: 'Motivo:', value: `${motivo}`},
                    {name: 'Servidor:', value: 'Discord'},
                )
                .setFooter({ text: `ID Punido: ${user.id}⠀• ID Aplicador: ${interaction.user.id} `});

                user2.ban({ reason: [motivo] }).then(() => {

                interaction.reply({
                    content: `Usuário punido com sucesso! :white_check_mark:`, ephemeral: true
                })

            })

            chat.send({
                embeds: [ryan]
             }).catch( (e) => {
                 interaction.reply({ content: `Algo deu errado, por favor tente novamente...`,ephemeral: true })
             }
            )
        }
    }


}
