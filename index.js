import { Telegraf } from "telegraf";
const TOKEN = "5738705161:AAF15n4PDuO1mkOZ1ZMaSBbLCXZRGA6jEpI";
import imageSearch from "image-search-google";

const bot = new Telegraf(TOKEN);

const client = new imageSearch(
	"1017b26965d7849cd",
	"AIzaSyBa5minfOP2mpq8RDZLa13K-8aasA0HmyI"
);

bot.start((ctx) => {
	const firstName = ctx.update.message.from.first_name;
	ctx.replyWithHTML(`Welcome <b>${firstName}</b> 👋`);
});

bot.on("message", async (ctx) => {
	let text = ctx.update.message.text;
	let chatId = ctx.update.message.from.id;
	console.log(text, chatId);
	try {
		const options = { page: 1 };
		client
			.search(text, options)
			.then((images) => {
				console.log(images);
				images = images.slice(0, 4);
				for (let i in images) {
					if (
						["jpg", "jpeg", "png"].includes(
							images[i].url.slice(images[i].url.lastIndexOf(".") + 1)
						)
					)
						try {
							ctx.replyWithPhoto(images[i].url);
						} catch (error) {
							console.log(images[i].url, "XATO");
						}
				}
			})
			.catch((error) => console.log("XATO"));
	} catch (error) {
		console.log("XATOLIK KETDI");
	}
});

bot.launch();
