import CookiecordClient, { command, Module } from "cookiecord";
import { Message, MessageEmbed } from "discord.js";
import db from "../db";

let talkedRecently = new Set()

export default class SlotModule extends Module {
    public emojis: string[] = ['💎', '🍋', '🔔', '🧲', '🍉', '🍒', '❤']

    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({
        aliases: ['slot']
    })
    slots(msg: Message, amount: string) {
        if (amount !== 'all' && !parseInt(amount) || db.get(msg.author.id + '.cash') <= 0) 
            return msg.channel.send('Do that again but actually send a amount.');

        if (db.get(msg.author.id + '.cash') < parseInt(amount))
            return msg.channel.send('Do that again, but give a number you have :|');

        if (talkedRecently.has(msg.author.id)) 
            return msg.channel.send('Calm down there, a bit too fast.');
        
        let emojis = [...Array(3)].map(() => this.emojis[Math.floor(Math.random() * this.emojis.length)])

        let winorloss: String;

        emojis[0] === emojis[1] && emojis[0] === emojis[2] ? winorloss = 'Won' : winorloss = 'Lost';

        winorloss === 'Won'
        ? db.add(`${msg.author.id}.cash`, amount)
        : db.set(`${msg.author.id}.cash`, db.get(`${msg.author.id}.cash`) + parseInt(amount))

        let embed: MessageEmbed = new MessageEmbed()
            .setTitle('Slots')
            .setDescription(`**>** ${emojis.join(' ')} **<**\n\nYou ${winorloss}: **${amount}**\nYour new balance is **${db.get(msg.author.id + '.cash')}**`)
            .setColor(winorloss === 'Won' ? '#52FF33' : '#FF0000')
            
        msg.channel.send(embed);

        setTimeout(() => {
            talkedRecently.delete(msg.author.id);
        }, 45000);
    }
}
