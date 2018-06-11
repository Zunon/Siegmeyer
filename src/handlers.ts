import { Message } from "discord.js";

export function addRole(message: Message, commandArguments: string[]) {
  let 
    guild = message.guild

  commandArguments.forEach(roleName => {
    let role = guild.roles.find(`name`, roleName.toUpperCase())
    message.member.addRole(role).then(
      () => {
        message.reply(`Added Role ${roleName}`)
      },
      error => {
        message.reply(`Couldn't add role ${roleName}\n${error}`)
      }
    )
  })
}

export function removeRole(message: Message, commandArguments: string[]) {
  let 
    guild = message.guild

  commandArguments.forEach(roleName => {
    let role = guild.roles.find(`name`, roleName.toUpperCase())
    message.member.removeRole(role).then(
      () => {
        message.reply(`Removed Role ${roleName}`)
      },
      error => {
        message.reply(`Couldn't remove role ${roleName}\n${error},\n${error.code}`)
      }
    )
  })
}