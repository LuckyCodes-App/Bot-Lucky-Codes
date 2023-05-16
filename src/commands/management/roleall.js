const Discord = require("discord.js");

module.exports = {
  name: "roleall",
  description: "Setar o cargo na porra toda",
  type: 1,
  options: [
    {
      name: "cargo",
      description: "Mencione um cargo",
      type: 8,
      required: true,
    },
  ],
  permissions: {},
  run: async (client, interaction, args) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.Administrator
      )
    ) {
      return await interaction.reply({
        content: `${interaction.user}, você precisa da permissão de **ADMINISTRADOR** para executar esta função.`,
        ephemeral: true,
      });
    } else if (
      !interaction.guild.members.cache
        .get(client.user.id)
        .permissions.has(Discord.PermissionsBitField.Flags.Administrator)
    )
      return interaction.reply({
        content: `${interaction.user}, eu preciso da permissão de **ADMINISTRADOR** para executar esta função.`,
        ephemeral: true,
      });

    let cargo = interaction.options.getRole("cargo");

    let server = interaction.guild;

    if (!cargo)
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder({
            description:
              "Opss... Parece que você não mencionou um cargo válido.",
          }),
        ],
      });

    const sucesso = new Discord.EmbedBuilder()
      .setTitle("Sistema de Cargo")
      .setDescription(
        ` _Cargo Adicionado:_ ${cargo}\n _Quem utilizou o comando:_ ${interaction.user}\n _Setando o cargo para:_ \`${server.memberCount}\` Membros`
      );

    interaction.guild.members.cache.forEach((member) => {
      member.roles.add(cargo.id).catch((e) => console.log(e));
    });

    interaction.reply({ embeds: [sucesso] });
  },
};
