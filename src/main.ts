/*
  ------------ IMPORTS, INSTANCES, AND VARIABLES ------------
*/
import { Client, Message, TextChannel, MessageReaction, User, Channel, GuildMember, Guild } from "discord.js" // Import needed classes from discord.js library
import config from "../config"
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
    var text: string[] = message.content.toLowerCase().split(` `)
    var command: string = text[0].substr(1)
    text.shift()
    // Matches command with known commands
    switch(command) {
      /*
        If it's a public command, it fires the handler straight away
        and passes the message object and the arguments passed into
        the command
      */
      case `role`:
        message.guild.fetchMember(message.author.id).then(user => {
          user.addRole(message.guild.roles.find(`name`, text[0])).then(user => {
            user.send(`Successfully added role!`)
          })
        })
      // If the command wasn't recognized, it replies saying that the command wasn't recognized
      default:
        message.reply("sorry I didn't recognize that command.")
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