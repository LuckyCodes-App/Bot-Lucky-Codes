const Discord = require("discord.js")
const cor = require('../../../cores.json')

module.exports = {
  name: "cargo",
  description: "Ganhe cargos clicando nos botões.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "cargo",
        description: "Mencione o cargo que deseja ser adicionado no botão.",
        type: Discord.ApplicationCommandOptionType.Role,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let cargo = interaction.options.getRole("cargo");

        let embed = new Discord.EmbedBuilder()
        .setColor(cor.Cores.Padrão)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(` > Clique No Botão Abaixo Para Receber A Tag
        
        > Apos Clicar Voce Recebera A Tag : **${cargo.name}**
        
        > Caso Queira Retirar O Cargo Clique Novamente No Botão Abaixo.`)
        

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("cargo_b" + interaction.id)
            .setLabel("Ganhar Cargo!")
            .setStyle(Discord.ButtonStyle.Secondary)
        );

        interaction.reply({ embeds: [embed], components: [botao] }).then( () => {

            let coletor = interaction.channel.createMessageComponentCollector();

            coletor.on("collect", (c) => {
                if (!c.member.roles.cache.get(cargo.id)) {
                    c.member.roles.add(cargo.id)
                    c.reply({ content: `🔔 Olá **${c.user.username}**, Você Resgatou O Cargo! **${cargo.name}**.`, ephemeral: true })
                } else if (c.member.roles.cache.get(cargo.id)) {
                    c.member.roles.remove(cargo.id)
                    c.reply({ content: `🔔 Olá **${c.user.username}**, Você Perdeu O Cargo! **${cargo.name}**.`, ephemeral: true })
                }
                
            })
        })
    }


 }
}