const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, AuditLogEvent, Partials } = require('discord.js');

const fs = require('fs');
const client = new Client({ partials: [
                                      Partials.Channel,
                                      Partials.Message,
                                      Partials.Reaction
                         ], intents: [
                                      GatewayIntentBits.Guilds, 
                                      GatewayIntentBits.GuildMessages, 
                                      GatewayIntentBits.MessageContent, 
                                      GatewayIntentBits.GuildMessageReactions, 
                                      GatewayIntentBits.GuildMembers, 
                                      GatewayIntentBits.GuildInvites, 
                                      GatewayIntentBits.GuildModeration,  
                                      GatewayIntentBits.DirectMessages, 
                                      GatewayIntentBits.GuildVoiceStates, 
                                      GatewayIntentBits.DirectMessageReactions,  
                                      GatewayIntentBits.DirectMessageTyping,
                                      GatewayIntentBits.Guilds,
                                      GatewayIntentBits.GuildEmojisAndStickers,
                                      GatewayIntentBits.GuildIntegrations,
                                      GatewayIntentBits.AutoModerationConfiguration,
                                      GatewayIntentBits.AutoModerationExecution,
                                      GatewayIntentBits.GuildScheduledEvents] 
});

client.commands = new Collection();
require('dotenv').config();
const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {

  for (file of functions) {

    require(`./src/functions/${file}`)(client);

  }

  client.handleEvents(eventFiles, "./src/events");

  client.handleCommands(commandFolders, "./src/commands");

  await client.login(process.env.token);
    
   
}
)();