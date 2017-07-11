using Discord;
class Program
{
    static void Main(string[] args) => new Program().Start();

    public void Start()
    {
        var client = new DiscordClient();

        client.MessageReceived += async (s, e) =>
        {
            if (!e.Message.IsAuthor)
                await e.Channel.SendMessage($"{e.Message.User.Mention} is awesome!");
        };

        client.ExecuteAndWait(async () => {
            await client.Connect("MY_BOT_TOKEN_HERE", TokenType.Bot);
        });
    }
}