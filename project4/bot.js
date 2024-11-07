require("dotenv").config()
const m = require("masto")
const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN,
})

const stream = m.createStreamingAPIClient({
    accessToken: process.env.TOKEN,
    streamingApiUrl: "wss://networked-media.itp.io",
});


async function makeStatus(text) {
    const status = await masto.v1.statuses.create({
        status: text,
        visibility: "public"
    })

}
let questions = ["What is your favorite color?", "Where would you like to travel?", "What book are you currently reading?", "What’s your favorite food?", "If you could have dinner with any fictional character, who would it be?", "What’s one thing on your bucket list?",
    "What’s your go-to comfort food?", "What’s a skill you’ve always wanted to learn?", "What’s the last show you binge-watched?", "If you could time travel, where and when would you go?", "What’s your favorite pets?", "What’s the most memorable trip you've ever had?", "What motivates you to keep going every day?"]
let emojis = ["💜!", "📸!", "🐨", "🐥", "🌿", "🌼", "🌒", "☁️", "🍊", "🥭", "🍍", "🍞", "🥜", "🍱", "🎼", "🧩", "🛫", "🗺️", "🌋", "🌅", "🏙️", "🖼️", "💌", "📅", "💙", "🤍", "💕", "🔆", "🎶", "🀄️"]


function multipleStatuses() {
    let randEmojis = Math.floor(Math.random() * emojis.length)
    let randQuestions = Math.floor(Math.random() * questions.length)
    let mention = "@garnetwen"
    let post = `${mention} ${questions[randQuestions]}! ${emojis[randEmojis]}`


    makeStatus(post);
}
setInterval(multipleStatuses, 900000)

async function reply() {
    const notificationSubscription = await stream.user.notification.subscribe();

    for await (let notif of notificationSubscription) {

        let acct = notif.payload.account.acct;
        let replyId = notif.payload.status.id;
        let postContent = notif.payload.status.content;


        let emojiOnly = emojis.some(emoji => postContent.includes(emoji));

        if (emojiOnly || notif.payload.type === "mention") {
            let randEmojiReply = Math.floor(Math.random() * emojis.length);
            let randomReply = emojis[randEmojiReply];

            console.log("Mention or emoji detected");

            await masto.v1.statuses.create({
                status: randomReply,
                visibility: "public",
                in_reply_to_id: replyId,
            });
        }
    }
}

reply();
