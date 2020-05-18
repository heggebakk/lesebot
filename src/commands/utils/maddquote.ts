import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { Message } from "discord.js";

import { Quote } from "../../types";
import { writeJson } from "../../utils";
import { ADDED_QUOTES_PATH } from "../../modules/quotes";

class ManuallyAddQuoteCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "maddquote",
      aliases: ["maq"],
      group: "fun",
      memberName: "maddquote",
      description: "Add a quote to the servers memory bank, just manually",
      hidden: true,
      args: [
        {
          key: "text",
          prompt: "The authors glorious quote",
          type: "string",
        },
        {
          key: "author",
          prompt: "The glorious authors ",
          type: "string",
        },
      ],
    });
  }

  run = async (
    message: CommandoMessage,
    { text, author }: { text: string; author: string },
  ): Promise<Message | Message[]> => {
    const quote: Quote = { quote: text, author: author, date: new Date() };
    await writeJson(ADDED_QUOTES_PATH, quote);

    return await message.say(`Thanks! Added a new quote to the memory bank...`);
  };
}

export default ManuallyAddQuoteCommand;