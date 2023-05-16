require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const cor = require('./cores.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ], 
    partials: [
        Partials.Message, 
        Partials.GuildMember, 
        Partials.Reaction, 
        Partials.User, 
        Partials.Channel, 
        Partials.GuildScheduledEvent,
    ],
});

['commands'].forEach(f => client[f] = new Collection());
['commands', 'events'].forEach(f => require(`./src/handlers/${f}`)(client));

client.login(process.env.TOKEN);

client.on("guildMemberAdd", (member) => {
    let canal_logs = "1086606160259453068";
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor(cor.Cores.Padrão)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`Olá ${member}!\nSeja Bem-Vindo(a) a LuckyCodes \`${member.guild.name}\`!\n Recomendamos dar uma lida no canal <#1089660025863147581>, lá tem tudo que você precisa.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) 
})

client.on("guildMemberAdd", (member) => {
  let cargo_autorole = member.guild.roles.cache.get("1107823656366788669");
  if (!cargo_autorole)
    return console.log("❌ O AUTOROLE não está configurado.");

  member.roles.add(cargo_autorole.id).catch((err) => {
    console.log(
      `❌ Não foi possível adicionar o cargo de autorole no usuário ${member.user.tag}.`
    );
  });
});