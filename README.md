# Getting Started With Discord

Welcome to Discord! Congratulations on choosing _the_ coolest chat platform this side of the Mississippi for your next project—regardless of what side of the Mississippi you live on. This guide will help you get your very own Discord bot up and running in no time at all. This guide will primarily utilize the [Discord.Net library written for C#](https://github.com/RogueException/Discord.Net), but can be applied to whatever language fills your heart with variables and joy. A [full list of our officially vetted libraries](https://discordapp.com/developers/docs/topics/libraries) can be found on our website.

All of our [documentation is on GitHub](https://github.com/hammerandchisel/discord-api-docs) if you'd like to take a deeper dive at any point; we also love corrections and improvements.

Let's get started!

## Applications, or: How I Stopped Worrying and Learned to Love the Robots

Making an application, or app, on Discord opens up a world of possibilities. You can do anything from designing a fully automated matchmaking system for your favorite game to playing theme music when you enter a voice channel. To start making your app, first visit [your app registration page](https://discordapp.com/developers/applications/me) and click on the "New App" tile. You'll see a page that looks like this:

![Imgur](http://i.imgur.com/rDDAIaZ.png)

First, we must name our magnificent creation and give it a description. Will your bot play Rock/Paper/Scissors/Lizard/Spock, or be a jukebox for your friends? Let the world know here. Of course, be sure to give your bot an icon, for that personal touch. When you're done, hit "Create App" and revel in your success!

# There's No Place Like Home

Now it's time to give our bot a home of its very own—or, many! Bots can be added to as many servers as you'd like and are not subject to the 100 server cap that us humans are. To add your new bot to your server, we've got to do a little bit of setup. Your app's page will look like this after it's been created:

![Imgur](http://i.imgur.com/rZrM96d.png)

There's a whole lot to look at here, but we're concerned primarily with two things: your Client ID, and creating a Bot User.  Right now, your application is dormant. To bring our creation to life, hit the "Create a Bot User" button and accept the pop-up. Bot Users are a special kind of Discord user that is, well, a bot! You can find out more about them on [our post about the Robot Revolution.](https://blog.discordapp.com/the-robot-revolution-has-unofficially-begun-unofficial-api-23a3c722d5bf#.l20q61gl5) 

Congratulations! Your bot is now ready to make friends. If you want to keep your bot quarantined to your own personal server until it's ready for the world, leave the "Public Bot" option unchecked. This means that the bot will only be allowed to join servers in which you have administrative permissions. Before we leave, make sure to note down your bot's `Client ID` and `Token`. We'll need them later!

Adding the bot to your server is easy. Simply go to [https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0](https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0) in your favorite web browser, changing out `YOUR_CLIENT_ID_HERE` for your bot's Client ID that we noted earlier, and changing `permissions` to the integer that represents the privileges you'd like to allow your bot to have. A [full list of persmissions](https://discordapp.com/developers/docs/topics/permissions#bitwise-permission-flags) is available for your bitwise operation pleasure.

To make it even easier, some friends of ours have made a handy [Permissions Calculator Tool](https://discordapi.com/permissions.html#) to help those of us who are mathematically impaired. You can easily choose which permissions you'd like your bot to have, and their handy tool with do the math for you. You can also insert your Client ID at the bottom of the page and have it generate your invite link for you. This link is what everyone will use to add your bot to their server.

Navigate to that link, select the server you'd like to ~~invade~~ join from the dropdown menu, and hit "Authorize". Voila! Now your bot has a home, and an easy way for others to invite it to their own server! Notice the [BOT] tag next to its name to denote it as a Bot User. This guy isn't fooling anyone.

![Imgur](http://i.imgur.com/xVvWdxU.png)

So we've made a bot, and added it to our server. But, as you can see from its `OFFLINE` status, it's still sleeping! Let's get to coding and bring our creation to life!

# IT LIVES!

It's time to bring our bot to life. This section will cover the basics of receiving and sending messages to a server using the Discord.Net C# library. Sending and receiving messages, text or voice, is the foundation on which all of Discord is built, and we're going to show you just how awesome it is.

First, open up your favorite IDE/text editor/box that contains your stone tablet and chisel, and create a new console application. Since we'll be using C#, we'll stick with Visual Studio. The Discord.Net library is available from NuGet, and we'll want to install [Discord.Net](https://www.nuget.org/packages/Discord.Net), [Discord.Net.Commands](https://www.nuget.org/packages/Discord.Net.Commands), and [Discord.Net.Modules](https://www.nuget.org/packages/Discord.Net.Modules). To add voice capabilities to your bot, you'll also need [Discord.Net.Audio](https://www.nuget.org/packages/Discord.Net.Audio). Adding these packages will also add their necessary dependencies.

> A note on async: the Discord.Net library uses tasks and asynchronous programming methods extensively in order to keep everything running smoothly. A more comprehensive explanation of asynchronous programming can be [found in Microsoft's documentation](https://msdn.microsoft.com/en-us/library/mt674882.aspx). For our purposes, just remember to mark your methods as `async` and to `await` your tasks.

Implementation is best explained by example, so we'll go through the following example piece by piece:

<script src="https://gist.github.com/msciotti/7854499bd63a565bf2340dc23b3c0cda.js"></script>

`using Discord;` - This is familiar to anyone who's worked with .NET. It lets our application know that we want to make use of the Discord.Net library. 

`static void Main(string[] args) => new Program().Start();` - It's best to not run all of our code in a single static method. This instantiates a `new Program()` and calls its `Start()` method which we've defined.

`var client = new DiscordClient();` - This creates a new instance of the `DiscordClient()` class which we will use to make our requests. In a larger application, it may make sense to create a private instance of this class that can be used throughout the code and just instantiate it here.

`client.MessageReceived += async (s, e) => {` - This is what's called a [lambda expression](https://msdn.microsoft.com/en-us/library/bb397687.aspx), which allows us to define custom code to call every time a given event happens. In this case, the code we write for `client.MessageReceived` will fire every time a new message appears in the chat server. The `+=` operators are how we "subscribe" to the `MessageReceived` event; more info on events can be found [from Microsoft](https://msdn.microsoft.com/en-us/library/awbftdfh.aspx); `async (s, e)` indicates that our function will run asynchronously, and that we are passing two parameters: (s)ender and (e)vent args.

`if (!e.Message.IsAuthor)` - This pulls the received message from the event args and checks if our bot was the one who sent it. This keeps us from creating an infinite loop.

`await e.Channel.SendMessage($"{e.Message.User.Mention} is awesome!"); };` - `SendMessage()` is an asynchronous method - note the `await` - that takes a string. You can say whatever you want here! In this case, we figure out who sent the message, pull the string to mention them, and give them some friendly words of encouragement. If you've made it this far, you ARE awesome, and deserve the recognition!

`client.ExecuteAndWait(async () => {` - This line allows us to run asynchronous code in a synchronous method. In our case, it's the code that keeps our bot connected. The specifics of this pattern are a great lesson in asynchronous programming, but in our case, pretend it's like a fancy `while()` loop that keeps our bot alive.

`await client.Connect("MY_BOT_TOKEN_HERE", TokenType.Bot); });` - This is the code that connects our bot to Discord. Replace `MY_BOT_TOKEN_HERE` with the token we saved earlier from your bot's settings page. `TokenType.Bot` lets Discord.Net know that we're connecting as a bot user rather than a regular user.

Phew! That was a long explanation. Take five and pat yourself on the back for a job well done. When you're ready, build and run your application, and watch your bot come to life!

![Imgur](http://imgur.com/3tgLl8i.gif)

