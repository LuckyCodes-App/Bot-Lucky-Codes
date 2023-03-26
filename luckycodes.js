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

//**      HANDLERS      *//
['commands'].forEach(f => client[f] = new Collection());
['commands', 'events'].forEach(f => require(`./src/handlers/${f}`)(client));
//**      HANDLERS      *//



//**      TOKEN      *//
client.login(process.env.TOKEN);
//**      TOKEN      *//



//**      ENTRADA      *//
client.on("guildMemberAdd", (member) => {
    let canal_logs = "1086606160259453068";
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor(cor.Cores.Padrão)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`Olá ${member}!\nSeja Bem-Vindo(a) a LuckyCodes \`${member.guild.name}\`!\n Responda o <#1086606163883339838> para ter acesso ao servidor.\n Recomendamos dar uma lida no canal <#1089660025863147581>, lá tem tudo que você precisa.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) 
  })
//**      ENTRADA      *//



//**      CAPTCHA      *//
client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "verificar") {
        let role_id = await db.get(`cargo_verificação_${interaction.guild.id}`);
        let role = interaction.guild.roles.cache.get(role_id);
        if (!role) return;
        interaction.member.roles.add(role.id)
        interaction.reply({ content: `Ola **${interaction.user.username}**, você foi verificado!`, ephemeral: true })
      }
    }
  })
//**      CAPTCHA      *//