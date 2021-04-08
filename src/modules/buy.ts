import CookiecordClient, { command, Module, optional } from "cookiecord";
import { Message, MessageEmbed } from "discord.js";
import db from "../db";
import { Shop, default as ShopInterface } from "../shopitems";

export default class BuyModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    private getAmountOwned(id: string, item: string): number {
        let amountOwned = 0;

        if (!db.get(`${id}.items`)) return amountOwned;

        db.get(`${id}.items`).forEach((item2: ShopInterface) => {
            if (item2.itemName.toLowerCase() === item.toLowerCase()) amountOwned++
        });

        return amountOwned;
    }

    @command({
        aliases: [
            'purchase'
        ]
    })
    buy(msg: Message, item: string, @optional amount: number) {
        Shop.forEach((item2) => {
            if (!amount) amount = 1;

            if (item2.id.toLowerCase() === item.toLowerCase() || item.toLowerCase() === item2.itemName.toLowerCase()) {
                if (item2.maxallowed && item2.maxallowed < this.getAmountOwned(msg.author.id, item.toLowerCase())) 
                    return msg.channel.send('You have more than the max amount of items you can own of this.');

                if (item2.value * amount > db.get(`${msg.author.id}.cash`))
                    return msg.channel.send('Bruh you cant afford this LOL WHAT A POOR NOOB');

                for (let i = 0; i < amount; i++) {
                    db.push(`${msg.author.id}.items`, item2.itemName)
                }
    
                let embed: MessageEmbed = new MessageEmbed()
                    .setTitle(`✅ Succesfully bought ${amount} ${item2.itemName}`)
                    .setColor('#52FF33')
        
                db.set(`${msg.author.id}.cash`, db.get(`${msg.author.id}.cash`) - item2.value * amount)

                msg.channel.send(embed);
            }
        })
    }
}
