import CookiecordClient, { command, Module } from "cookiecord";
import { Message, MessageEmbed } from "discord.js";
import db from "../db";

let amountToGive: number = 1000;

export default class DailyModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command()
    daily(msg: Message) {
        let embed: MessageEmbed = new MessageEmbed()
            .setDescription('❌ LOL BRUH YOU TRIED EVEN THO YOU HAVE: `' + Math.floor(86400 - ((Date.now()/1000) - db.get(`${msg.author.id}.daily`))) + '` seconds left L')
            .setColor('#FF0000')

        if (db.get(`${msg.author.id}.daily`) && ((Date.now()/1000) - db.get(`${msg.author.id}.daily`)) < 86400)
            return msg.channel.send(embed)

        db.set(`${msg.author.id}.daily`, Date.now()/1000);

        embed.description = `💰 lol heres your \`${amountToGive}\` coins for the day.`;
        embed.setColor('#52FF33');

        db.add(`${msg.author.id}.cash`, amountToGive);
        msg.channel.send(embed)
    }
} 