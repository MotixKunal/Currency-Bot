import CookiecordClient, { command, Module, optional } from "cookiecord"
import { Message, MessageEmbed, User } from "discord.js";
import db from "../db";

export default class BalModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({
        aliases: ['balance']
    })
    bal(msg: Message, @optional user: User) {
        if (!user) user = msg.author;

        let embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${user.username} - Balance`)
            .setDescription(`${user.username} has: \`${db.get(`${user.id}.cash`) || 0}\`  coins.`)
            .setColor('#52FF33')
        
        msg.channel.send(embed);
    }
}