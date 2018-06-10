import { Message } from "discord.js";

export function addRole(message: Message, commandArguments: string[]) {
  let 
    guild = message.guild,
    roleName = commandArguments[1]

  guild.fetchMember(message.author.id).then(user => {
    user.addRole(guild.roles.find(`name`, roleName)).then(user => {
      user.send(`Successfully added role!`)
    })
  })
}

export function removeRole(message: Message, commandArguments: string[]) {
  let
    guild = message.guild,
    roleName = commandArguments[1]
    
  guild.fetchMember(message.author.id).then(user => {
    user.removeRole(guild.roles.find(`name`, roleName)).then(user => {
      user.send(`Successfully removed role!`)
    })
  })
}