import { Message } from "discord.js";

export function addRole(message: Message, commandArguments: string[]) {
  let 
    guild = message.guild

  commandArguments.forEach(roleName => {
    guild.fetchMember(message.author.id).then(user => {
      user.addRole(guild.roles.find(`name`, roleName.toUpperCase())).then(
        user => {
          user.send(`Successfully added role!`)
        },
        error => {
          user.send(`Error, couldn't add role ${roleName}\n${error}`)
        }
      )
    })
  })
}

export function removeRole(message: Message, commandArguments: string[]) {
  let 
    guild = message.guild

  commandArguments.forEach(roleName => {
    let role = guild.roles.find(`name`, roleName.toUpperCase())
    message.member.removeRole(role).then(
      user => {
        message.reply(`Removed Role ${roleName}`)
      },
      error => {
        message.reply(`Couldn't remove role ${roleName}\n${error}`)
      }
    )
  })
}