const express=require('express')
const dotenv=require('dotenv').config();
const {Telegraf}=require('telegraf');
const { GoogleGenAI } =require("@google/genai");
const app=express();
const port=3200
app.use(express.json())
let bot=new Telegraf(process.env.TOKEN)
const ai = new GoogleGenAI({apiKey:process.env.APIKEY});
bot.on('text', async (ctx) => {

  try {

    await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${ctx.message.text}`,
    });
    await ctx.reply(response.text);}


   catch (error) {
   console.log(error);
  ctx.reply('Error while talking to AI 😢');
  }
});
bot.launch();
console.log('AI Telegram Bot is running...'); 

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})