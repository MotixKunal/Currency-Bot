import { Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";

import { default as db } from '../db';

let talkedRecently = new Set()

let names = ['Divy', 'Kunal', 'Arun', 'Janak', 'Nabin', 'Tenzin', 'Panda'];

function addCash(userID: string, amount: number) {
    return new Promise((resolve, reject) => {
        try {
            db.add(`${userID}.cash`, amount);
            resolve('Success.');
        } catch(err) {
            reject(err);
        }
    })
}

export default class FreeModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command()
    free(msg: Message) {
        if (talkedRecently.has(msg.author.id)) 
            return msg.channel.send('Please chill out you cunt.');

        talkedRecently.add(msg.author.id)

        let amount = Math.floor(Math.random() * 25 + 25);

        addCash(msg.author.id, amount).then(() => {
            let embed: MessageEmbed = new MessageEmbed()
                .setTitle(`💰 ${names[Math.floor(Math.random() * names.length)]} gave you Succesfully gave you ${amount} coins.`)
                .setColor('#52FF33')
                
            msg.channel.send(embed);
        })
        setTimeout(() => {
            talkedRecently.delete(msg.author.id)
        }, 60000)
    }
}