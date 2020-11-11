Simple bot that mutes and unmutes all users in the channel it currently lives. Pretty handy for your friends that DO NOT UNDERSTAND THEY ARE SUPPOSED TO BE TALKING ONLY IN MEETINGS OR WHEN A BODY IS DISCOVERED.

# How to run
-  Add your bot api key to "auth.json". If you do not how to obtain a valid api key for the bot, refer to [this guide](https://discordpy.readthedocs.io/en/latest/discord.html).
-  Also, make sure to type in the name of the channel you want the bot to connect, in the "channel.json" file.
-  Navigate to the root directory of the project, and execute npm install. When done, run with "node muter.js".
-  Finally, when giving the bot permissions, remember to allow him to mute other people in channels. Or, you can go for the shotgun solution and give it admin rights (not recommended).

# Usage 
-  Valid commands are !mute / !m, !unmute / !um , !gtfo (to gracefully shut the bot down)
