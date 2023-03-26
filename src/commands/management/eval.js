const util = require("util");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const DONO = "518458531758997516"; // Coloque seu ID
const cor = require('../../../cores.json')

module.exports = {
    name: "eval",
    description: "Testar códigos.",
    options: [
        {
            name: "codigo",
            description: "Insira o código que deseja testar.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "ephemeral",
            description: "Deseja que a mensagem apareça em ephemeral?",
            type: ApplicationCommandOptionType.Boolean,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (interaction.user.id !== DONO) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })
        const expression = interaction.options.getString("codigo");
        const ephemeral = interaction.options.getBoolean("ephemeral");

        const resultEmbed = new EmbedBuilder();
        const inputEmbed = new EmbedBuilder();

        inputEmbed.setColor(cor.Cores.Padrão);
        inputEmbed.setTitle("Entrada");
        inputEmbed.setThumbnail(client.user.displayAvatarURL());
        inputEmbed.setDescription(`\`\`\`js\n${expression}\`\`\``);

        try {
            const result = util.inspect(eval(expression));

            if (result.length > 4096) {
                resultEmbed.setColor(cor.Cores.Falha);
                resultEmbed.setTitle("Error");
                resultEmbed.setThumbnail(client.user.displayAvatarURL());
                resultEmbed.setDescription(
                    "```O resultado ultrapassa 4096 caracteres. Por esse motivo não pode ser exibido!```"
                );
            } else {
                resultEmbed.setColor(cor.Cores.Sucesso);
                resultEmbed.setTitle("Saída");
                resultEmbed.setThumbnail(client.user.displayAvatarURL());
                resultEmbed.setDescription(`\`\`\`js\n${result}\n\`\`\``);
            }

            interaction.reply({
                embeds: [inputEmbed, resultEmbed],
                ephemeral: ephemeral,
            });
        } catch (err) {
            resultEmbed.setColor(cor.Cores.Falha);
            resultEmbed.setTitle("Saída Error");
            resultEmbed.setThumbnail(client.user.displayAvatarURL());
            resultEmbed.setDescription(`\`\`\`js\n${err}\n\`\`\``);

            interaction.reply({
                embeds: [inputEmbed, resultEmbed],
                ephemeral: ephemeral,
            });
        }
    },
};