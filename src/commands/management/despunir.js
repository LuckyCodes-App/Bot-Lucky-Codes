const Discord = require('discord.js');
const cor = require('../../../cores.json')

module.exports = {
    name: "despunir",
    description: "Retire a punição de algum usuario do Discord",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'Selecione um usuario',
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
    ],

    run: async (client, interaction) => {


        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `<:xx:1035315658814132345> | Ola ${interaction.user}, Você não tem permissão para utilizar esse comando`, ephemeral: true })
        } else {
            let user = interaction.options.getUser("usuario")
            let user2 = interaction.guild.members.cache.get(user.id)
            if (!user) return interaction.reply({ content: 'Insira um id ou usuário válido', ephemeral: true })

            let chat = interaction.guild.channels.cache.get("1062454879815204944")

            let ryan = new Discord.EmbedBuilder()
            .setColor(cor.Cores.Padrão)
            .setTitle(`${user.username} # ${user.discriminator} foi despunido!`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {name: 'Autor', value: `${interaction.user.tag}`},
                {name: 'Servidor:', value: 'Discord'},
            )
            .setFooter({ text: `ID Despunido: ${user.id}⠀• ID Aplicador: ${interaction.user.id} `});

            let erro = new Discord.EmbedBuilder()
                .setColor(cor.Cores.Falha)
                .setDescription(`
                **Houve um erro ao tentar desbanir usuario, Coloque um ID valido para conseguir desbanir o usuario.**`)

            interaction.guild.members.unban(user).then(() => {

                interaction.reply({
                    content: `Usuário despunido com sucesso! :white_check_mark:`, ephemeral: true
                })

            })

                chat.send({
                    embeds: [ryan]
                 }).catch( (e) => {
                     interaction.reply({ content: `Algo deu errado, por favor tente novamente...`,ephemeral: true })


                interaction.reply({ embeds: [erro] })
            })
        }
    }
}
