/*
  ------------ IMPORTS, INSTANCES, AND VARIABLES ------------
*/
import { Client, Message, GuildMember } from "discord.js" // Import needed classes from discord.js library
import config from "../config"
import { addRole, removeRole, rawReactionEmitter } from "./handlers";
// Instantiate a client to use it
const client: Client = new Client()
/*
  ------------ LISTENERS ------------
*/
/**
 * Spit out unhandled errors without panicking
 * @listens error
 * @todo Replace it to handle specific error events as they arise
 */
client.on(`error`, (error: ErrorEvent) => console.error(`ERROR: ${error.message}`))
/**
 * Parse commands and fires the appropriate handler
 * @listens message
 */
client.on(`message`, (message: Message) => {
  // Check if message is a command
  if(message.content.startsWith(config.prefix)) {
    // Splits message into command and arguments
    let
      text: string[] = message.content.toLowerCase().split(` `),
      command: string = text[0].substr(1)

    text.shift()
    // Matches command with known commands
    switch(command) {
      /*
        If it's a public command, it fires the handler straight away
        and passes the message object and the arguments passed into
        the command
      */
      case `role`:
        switch(text[0]) {
          case `add`:
            text.shift()
            addRole(message.member, text)
            break
          case `remove`:
            text.shift()
            removeRole(message.member, text)
            break
          default:
            message.reply(`Please use the format !role <add | remove> <role>`)
        }
        break
      // If the command wasn't recognized, it replies saying that the command wasn't recognized
      default:
        message.reply("sorry I didn't recognize that command.")
    }
  }
})
client.on(`raw`, rawEvent => rawReactionEmitter(rawEvent, client))
client.on(`messageReactionAdd`, (reaction, user) => {
  if(reaction.message.id === config.roleMessage) {
    let
      guild = reaction.message.guild,
      member = guild.members.find(`id`, user.id)

    switch(reaction.emoji.name) {
      case `ps4`:
        addRole(member, ['PS4'])
        break
      case `💻`:
        addRole(member, ['PC'])
        break
    }
  }
})

client.on(`messageReactionRemove`, (reaction, user) => {
  let
      guild = reaction.message.guild,
      member = guild.members.find(`id`, user.id)
  if(reaction.message.id === config.roleMessage) {
    switch(reaction.emoji.name) {
      case `ps4`:
        removeRole(member, ['PS4'])
        break
      case `💻`:
        removeRole(member, ['PC'])
        break
    }
  }
})
/**
 * As soon as the bot is up and ready, confirm to console
 * @listens ready
 */
client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
/*
  ------------ EXECUTIONS ------------
*/
// Attempt to login by reading token from file
client.login(config.token)