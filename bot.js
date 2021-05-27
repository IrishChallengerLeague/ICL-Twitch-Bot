require("dotenv").config();
const tmi = require("tmi.js");

const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: ["icl_hub", "icl_hub_b"],
};

const client = new tmi.client(options);

client.connect();

client.on("connected", (address, port) => {
  client.action("icl_hub", "ICL Twitch Bot Loaded!");
  client.action("icl_hub_b", "ICL Twitch Bot Loaded!");
});

client.on("chat", (channel, user, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  if (message.toLowerCase() === "!icl") {
    client.say(
      channel,
      "The Irish Challenger League was created to give the Irish scene a platform to compete. Currently, we accept people of all EU nations if you have a friend who can vouch for you. Contact us via Discord for more info."
    );
  } else if (message.toLowerCase() === "!faceit") {
    client.say(channel, "https://www.faceit.com/en/inv/jaoMmaB");
  } else if (message.toLowerCase() === "!donate") {
    client.say(channel, "This is a test function");
  } else if (message.toLowerCase() === "!discord") {
    client.say(channel, "https://discord.gg/RjhDRY2kfH");
  }
});
