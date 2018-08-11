import { Message, TextChannel, User, Client, GuildMember, Guild } from "discord.js"

const reactionEvents = {
  MESSAGE_REACTION_ADD: `messageReactionAdd`,
  MESSAGE_REACTION_REMOVE: `messageReactionRemove`
}

export function addRole(user: GuildMember, commandArguments: string[]) {
  let 
    guild = user.guild

  commandArguments.forEach(roleName => {
    let role = guild.roles.find(`name`, roleName)
    user.addRole(role).then(
      () => {
        user.send(`Added Role ${roleName}`)
      },
      error => {
        user.send(`Couldn't add role ${roleName}\n${error}`)
      }
    )
  })
}

export function removeRole(user: GuildMember, commandArguments: string[]) {
  let 
    guild = user.guild
  commandArguments.forEach(roleName => {
    let role = guild.roles.find(`name`, roleName)
    user.removeRole(role).then(
      () => {
        user.send(`Removed Role ${roleName}`)
      },
      error => {
        user.send(`Couldn't remove role ${roleName}\n${error},\n${error.code}`)
      }
    )
  })
}

export async function rawReactionEmitter(rawEvent: any, client: Client) {
  if(!reactionEvents.hasOwnProperty(rawEvent.t)) {
    return
  }

  const
    { d: data } = rawEvent,
    user: User = client.users.get(data.user_id),
    channel: TextChannel = client.channels.get(data.channel_id) as TextChannel

  if(channel.messages.has(data.message_id)) {
    return
  }

  const
    message: Message = await channel.fetchMessage(data.message_id),
    emojiKey: string = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name,
    reaction = message.reactions.get(emojiKey)
  
  client.emit(reactionEvents[rawEvent.t], reaction, user)
}