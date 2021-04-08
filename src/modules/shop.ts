import CookiecordClient, { command, Module, optional } from "cookiecord";
import { Message, MessageEmbed } from "discord.js";
import db from "../db";
import { Shop, default as ShopInterface } from "../shopitems";

export default class ShopItems extends Module {
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

    @command({
        single: true
    })
    shop(msg: Message, @optional item: string) {
        if (!item) {
            let shopEmbed: MessageEmbed = new MessageEmbed()
                .setColor('#52FF33')
                .setTimestamp()
                .setFooter('Requested By ' + msg.author.tag, msg.author.displayAvatarURL())

            let i = 1;

            Shop.forEach((item) => {
                shopEmbed.addField(
                    i + ' - ' + item.itemName + ':',
                    `${item.description}\nID: \`${item.id}\``,
                )

                i++
            })

            return msg.channel.send(shopEmbed)
        }

        Shop.forEach((item2) => {
            if (item.toLowerCase() === item2.itemName.toLowerCase() || item.toLowerCase() === item2.id.toLowerCase()) {
                let embed: MessageEmbed = new MessageEmbed()
                    .setTitle(`Item - ${item2.itemName}`)
                    .setDescription(item2.description)
                    .setColor('#52FF33')
                    .addFields({
                        name: 'Buy-Price:',
                        value: item2.value,
                        inline: true
                    }, {
                        name: 'Sell-Price:',
                        value: item2.sellvalue,
                        inline: true
                    }, {
                        name: 'ID:',
                        value: item2.id,
                        inline: true
                    }, {
                        name: 'Amount-Owned:',
                        value: this.getAmountOwned(msg.author.id, item2.itemName)
                    })
                    .setTimestamp()
                    .setFooter('Requested By ' + msg.author.tag, msg.author.displayAvatarURL())

                return msg.channel.send(embed);
            }
        })

    }
}
