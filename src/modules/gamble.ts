import CookiecordClient, { command, Module, optional } from "cookiecord";
import { Message, MessageEmbed } from "discord.js";
import db from "../db";

let talkedRecently = new Set()

export default class GambleModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    private getAmountOwned(id: string, item: string): number {
        let amountOwned = 0;

        if (!db.get(`${id}.items`)) return amountOwned;

        db.get(`${id}.items`).forEach((item2: string) => {
            if (item2.toLowerCase() === item.toLowerCase()) amountOwned++
        });

        return amountOwned;
    }

    @command()
    gamble(msg: Message, @optional amount: string) {
        if (amount !== 'all' && !parseInt(amount) || db.get(msg.author.id + '.cash') <= 0) 
            return msg.channel.send('Do that again but actually send a amount.');

        if (db.get(msg.author.id + '.cash') < parseInt(amount))
            return msg.channel.send('Do that again, but give a number you have :|');

        if (talkedRecently.has(msg.author.id))
            return msg.channel.send('Calm down there, a bit too fast');

        let winOrLoss = Math.random() < (0.4 + this.getAmountOwned(msg.author.id, 'The Arun') < 0 ? 0 : (this.getAmountOwned(msg.author.id, 'The Arun')/10))
        
        if (winOrLoss) {
            let embed: MessageEmbed = new MessageEmbed()
                .setTitle('💰 You Won!')
                .setColor('#52FF33')

            db.add(`${msg.author.id}.cash`, amount !== 'all' ? parseInt(amount) : db.get(`${msg.author.id}.cash`));
 
            embed.description = `Your new balance is: \`${db.get(msg.author.id + '.cash')}\``;

            return msg.channel.send(embed);
        }

        let embed: MessageEmbed = new MessageEmbed()
            .setTitle('❌ You lost, unlucky.')
            .setColor('#FF0000')

        db.set(`${msg.author.id}.cash`, db.get(`${msg.author.id}.cash`) - (amount !== 'all' ? parseInt(amount) : db.get(`${msg.author.id}.cash`)))

        embed.description = `Your new balance is: \`${db.get(msg.author.id + '.cash')}\``;

        msg.channel.send(embed);

        setTimeout(() => {
            talkedRecently.delete(msg.author.id);
        }, 45000);
    }
}
