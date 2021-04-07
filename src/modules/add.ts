import CookiecordClient, { command, CommonInhibitors, Module } from "cookiecord";
import { Message, User } from "discord.js";
import db from "../db";

export default class AddModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({ 
        inhibitors: [
            CommonInhibitors.botAdminsOnly
        ]
    }) 
    add(msg: Message, user: User, amount: number) {
        db.add(`${user.id}.cash`, amount)
    }
}