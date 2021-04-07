import CookiecordClient, { command, Module, optional } from "cookiecord";
import { Message, MessageEmbed, User } from "discord.js";
import db from "../db";

export default class ShareModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({
        aliases: [
            'give',
            'donate'
        ]
    })
    share(msg: Message, amount: number, user: User) {
        if (user.bot)
            return msg.channel.send('you know you cant donate to a bot right? retard smh');

        if (user === msg.author)
            return msg.channel.send('this retard tried sending money to himself lol');

        if (amount > db.get(`${msg.author.id}.cash`))
            return msg.channel.send('lol send a amount you have retard');

        db.add(`${user.id}.cash`, amount);
        db.set(`${msg.author.id}.cash`, db.get(`${msg.author.id}.cash`) - amount)

        let embed: MessageEmbed = new MessageEmbed()
            .setTitle(`📬 Sharing`)
            .setDescription(`${msg.author.username} has gave ${user.username}: \`${amount}\` coins.\n${user.username} now has: \`${db.get(`${user.id}.cash`)}\` coins\nand ${msg.author.username} has: \`${db.get(`${msg.author.id}.cash`)}\` coins.`)
            .setColor('#52FF33')

        msg.channel.send(embed);
    }
}