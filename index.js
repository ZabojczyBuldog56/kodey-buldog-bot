const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

client.on('ready', () => {
  console.log('Serwerow online: ${bot.guilds.size}');
  client.user.setActivity('k:help - komendy | k:invite', {type: "STREAMING"});
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content.startsWith('k:avatar')) {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  // If the message content starts with "!kick"
  if (message.content.startsWith('k:kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Zlamanie regulaminu/testowanie').then(() => {
          // We let the message author know we were able to kick the person
           let kickCompleteEmbed = new Discord.RichEmbed()
           .setTitle('Wyrzucono pomyślnie członka:')
           .setDescription('${user.tag} z powodu: ${reason}')
           .setColor('#6AED13')
          .setTimestamp();     
        message.channel.send(kickCompleteEmbed);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
      let kickUnableErrorEmbed = new Discord.RichEmbed()
     .setTitle('Coś się posypało.')
     .setDescription('Bot nie mogł wyrzucić członka ze względów nieznanych dla bota.')
     .setColor('#ED2913')
     .setTimestamp();
     message.channel.send(kickUnableErrorEmbed);
          // Log the error
          console.error(err);
        });
      } else {
      }
    // Otherwise, if no user was mentioned
    } else {
      // The mentioned user isn't in this guild
        let kickNonMentionErrorEmbed = new Discord.RichEmbed()
     .setTitle('Nie oznaczyłeś członka.')
     .setDescription('Bot nie mogł wyrzucić członka ze względow na nieoznaczenie członka.')
     .setColor('#ED2913')
     .setTimestamp();
      message.reply(kickNonMentionErrorEmbed);
    }
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        let kickPermErrorEmbed = new Discord.RichEmbed()
     .setTitle('Brakuje wymaganych permisji:')
     .setDescription('Wymagane permisje: `KICK_MEMBERS`')
     .setColor('#ED2913')
     .setTimestamp();
     message.channel.send(kickPermErrorEmbed);
   }
   }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content.startsWith('<@506546667424841738>')) {
    // Send "pong" to the same channel
    message.channel.send('Co ty chcesz ode mnie?! (komenda zb!help ci pomoże)');
  }
});


client.on('message', message => {
  // If the message is "ping"
  if (message.content.startsWith('k:help')) {
    // Send "pong" to the same channel
    message.author.send('Komendy dla każdego: avatar, help, supportserver, invite, ban, kick, osu, say, meme, kula8 (więcej komend juz poźniej)'); 
    message.author.send('Komendy Global Administratorów Bota: reload'); 
    message.author.send('Komendy Hostera Bota: eval');
    message.channel.send('Dostępne komendy wysłałem ci na priv (jeżeli masz zablokowane DMy nic na to nie poradzę).');
  }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content.startsWith('k:invite')) {
    // Send "pong" to the same channel
    message.channel.send('Zobacz wiadomości prywatne, jeżeli masz je zablokowane nic na to nie poradzę.');
    message.author.send('Obczaj ten link, żeby zaprosić bota: https://discordapp.com/oauth2/authorize?client_id=506546667424841738&scope=bot&permissions=66443584');
  }
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('k:ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'Zostales wyrzucony z powodow wyznaczonych przez administracje',
        }).then(() => {
          // We let the message author know we were able to ban the person
          let banCompletedErrorEmbed = new Discord.RichEmbed()
          .setTitle('Pomyślnie zbanowano')
          .setDescription('Zbanowano: ', '${user.tag}', 'z powodu: ', '${reason}')
          .setColor('#6AED13')
          .setTimestamp();
     message.channel.send(banCompletedErrorEmbed);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          let banUnknownErrorEmbed = new Discord.RichEmbed()
          .setTitle('Coś się posypało.')
          .setDescription('Bot nie mógł wyrzucić członka, ponieważ nie zaznaczyłeś w konfiguracji bota możliwości banowania członków. Edytuj rolę `KodeyBuldogBot` i zaznacz wymaganą permisję. Pamiętaj, ze nie możesz banować osób z rolą wyższą od ciebie lub równą tobie.')
          .setColor('#ED2913')
          .setTimestamp();
     message.channel.send(banUnknownErrorEmbed);
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        let banNonGuildMemberErrorEmbed = new Discord.RichEmbed()
     .setTitle('Coś się posypało.')
     .setDescription('Bot nie mógł wyrzucić członka, ponieważ członek, którego zamierzasz zbanować nie jest na twoim serwerze.')
     .setColor('#ED2913')
     .setTimestamp();
     message.channel.send(banNonGuildMemberErrorEmbed);
      }
    } else {
    // Otherwise, if no user was mentioned
      let banNonMentionErrorEmbed = new Discord.RichEmbed()
     .setTitle('Coś sie posypalo.')
     .setDescription('Bot nie mógł wyrzucić członka, ponieważ nie oznaczyłeś członka którego chcesz zbanować.')
     .setColor('#ED2913')
     message.channel.send(banNonMentionErrorEmbed);
    }
     if (!message.member.hasPermission('BAN_MEMBERS')) {
       let banNoPermissionErrorEmbed = new Discord.RichEmbed()
     .setTitle('Brakuje wymaganych permisji.')
     .setDescription('Nie możesz zbanować członka, ponieważ nie posiadasz wymaganych permisji: `BAN_MEMBERS`')
     .setColor('#ED2913')
     message.channel.send(banNoPermissionErrorEmbed);
  }
  }
});

exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  if (!args || args.length < 1) return message.reply("Must provide a command to reload. Derp.");

  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`Błąd przy ładowaniu: ${response}`);

  response = client.loadCommand(args[0]);
  if (response) return message.reply(`Błąd przy przeładowaniu: ${response}`);

  message.reply(`Komenda \`${args[0]}\` zostala odswiezona.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Globalny Administrator Bota"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Odswiezanie komendy ostatnio zmodyfikowanej.",
  usage: "reload [command]"
};

client.on('message', message => {
  if (message.content.startsWith('k:say')) {
    let doCiecia = message.content
    let pociete = doCiecia.split('k:say ') //gdybyś zmienial nazwę komendy, tu też musisz zmienić. spacja na końcu jest wymagana!
    let wyslij = pociete[1]

    if (message.content.length > 1) {
    let outputEmbed = new Discord.RichEmbed()
     .setTitle('Bot przepisał następujący tekst:')
     .setDescription(wyslij)
     .setColor('#5EBA3F')
     .setTimestamp();
     message.channel.send(outputEmbed);
  }
  }
});

client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith("k:eval")) {
    if(message.author.id !== '353067694565883915') return message.channel.send('Komenda dostępna tylko dla deweloperów bota. Wymagany poziom permisji: 8 (Główny deweloper bota)');
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`Wykryto błąd przy wykonywaniu kodu.`);
    }
  }
});

client.on("message", message => { 
     if (message.content.startsWith("k:meme")) {
        const meme = 1 + Math.floor(Math.random() * 13);
        if (meme == 1) {
        const attachment = "https://media.discordapp.net/attachments/467954825083092992/501790687403180033/FB_IMG_1539091941074.jpg?width=393&height=468"
        message.channel.send(attachment);
        } if (meme == 2) {
        const attachment = "https://media.discordapp.net/attachments/472100694690627605/503941400065343489/FB_IMG_1540219113286.jpg?width=277&height=473"
        message.channel.send(attachment);
        } if (meme == 3) {
        const attachment = "https://cdn.discordapp.com/attachments/467954825083092992/498869823447760896/0_1_66627_Specjalne_mydlo_dla_zydow_i_murzynow_przez_BezBek.jpg"
        message.channel.send(attachment);
        } if (meme == 4) {
        const attachment = "https://cdn.discordapp.com/attachments/503869047964827649/504302224583819294/0_1_91963_Volksdeutchwagen_ein_volk_ein_wagen_ein_fuhrer_przez_loltracktor.gif"
        message.channel.send(attachment);
        } if (meme == 5) {
        const attachment = "https://cdn.discordapp.com/attachments/503869047964827649/504301971793117184/15349586520629.jpg"
        message.channel.send(attachment);
        } if (meme == 6) {
        const attachment = "https://cdn.discordapp.com/attachments/442753665208549376/504013340193062925/FB_IMG_1539773938905.jpg"
        message.channel.send(attachment);
        } if (meme == 7) {
        const attachment = "https://cdn.discordapp.com/attachments/442753665208549376/504012911736258580/filing_images_24efb747617d.png"
        message.channel.send(attachment);
        } if (meme == 8) {
        const attachment = "https://cdn.discordapp.com/attachments/442753665208549376/503507152447471616/unknown.png"
        message.channel.send(attachment);
        } if (meme == 9) {
        const attachment = "https://cdn.discordapp.com/attachments/419588999611678733/504023157922070549/44327476_505425593289033_7989022264462934016_n.png"
        message.channel.send(attachment);
        } if (meme == 10) {
        const attachment = "https://cdn.discordapp.com/attachments/419588999611678733/502239943654113281/FB_IMG_15398137047313738.jpg"
        message.channel.send(attachment);
        } if (meme == 11) {
        const attachment = "https://cdn.discordapp.com/attachments/467954825083092992/507473236418887680/Capture_2018-11-01-09-37-09.png"
        message.channel.send(attachment);
        } if (meme == 12) {
        const attachment = "https://cdn.discordapp.com/attachments/467954825083092992/507473236418887680/Capture_2018-11-01-09-37-09.png"
        message.channel.send(attachment);
        } if (meme == 13) {
        const attachment = "https://cdn.discordapp.com/attachments/467954825083092992/504396409651462170/sketch-1540327708528.png"
        message.channel.send(attachment);
        }
     }
});

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  const isPlaying = false;

  if (message.content === 'k:join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('Połączono z czatem głosowym.');
        })
        .catch(console.log);
    } else {
      message.reply('Dołącz do czatu głosowego, zanim użyjesz tej komendy.');
    }
  }
  
  if (message.content === 'k:playmusic') {
    if (message.member.voiceChannel) {
    let isPlaying = true;
    let doCiecia = message.content
    let pociete = doCiecia.split('k:playmusic ')
    let graj = pociete[1]
    const dispatcher = connection.playArbitraryInput(graj);
    message.channel.send('Odtwarzanie utworu: ', '**', graj, '**'); 
    } 
  }
  
  if (message.content === 'k:pause') {
   if (isPlaying == true) {
    let isPlaying = false;
    dispatcher.pause();
    message.channel.send('Spauzowano :thumbsup:');
   } if (isPlaying == false) {
     let pausedEmbed = new Discord.RichEmbed()
     .setTitle('Nie możesz spauzować utworu.')
     .setDescription('Utwór jest spauzowany bądź nie wpisałeś komendy: `zb!playmusic`.')
     .setColor('#ED2913')
     .setTimestamp();
     message.channel.send(pausedEmbed);
   }
  }

  if (message.content === 'k:resume') {
    if (isPlaying == false) {
    let isPlaying = true;
    dispatcher.resume();
    message.channel.send('Ponowiono granie :thumbsup:');
    } if (isPlaying == true) {
    let pausedEmbed = new Discord.RichEmbed()
     .setTitle('Nie możesz ponowić grania utworu aktualnie grającego.')
     .setDescription('Utwór aktualnie jest grany bądź nie wpisałeś komendy: `zb!pause`.')
     .setColor('#ED2913')
     .setTimestamp();
     message.channel.send(pausedEmbed);
    }
  }
  
  if (message.content === 'k:stop') {
    if (isPlaying == true) {
    let isPlaying = false;
    dispatcher.end();
    message.channel.send('Zatrzymano :thumbsup:');
    } if (isPlaying == false) {
    let stopEmbed = new Discord.RichEmbed()
     .setTitle('Nie możesz zatrzymać muzyki, ponieważ:')
     .setDescription('nie ustawiłeś muzyki. Przecież to jest tak samo jak z gramofonami - jak nie ustawisz płyty, muzyka nie będzie grała. Proste? Ustaw muzykę, wpisując `zb!playmusic <URL muzyki na YT>`.')
     .setColor('#ED2913')
     .setTimestamp();
     message.channel.send(stopEmbed);
    }
  }
});

//moduł kuli 8
client.on('message', message => {
     if (message.content.startsWith('k:kula8')) {
         const odpowiedz = 1 + Math.floor(Math.random() * 8);
         let doCiecia = message.content
         let pociete = doCiecia.split('k:kula8 ');
         let pytanie = pociete[1];
         
         if (odpowiedz == 1) {
             message.channel.send('A co ja jestem? Informacja?');
             console.log('Odpowiedz z ID: 1');
         }
         if (odpowiedz == 2) {
             message.channel.send('Jeżeli miałbyś wyższą rangę, odpowiedziałbym ci.');
             console.log('Odpowiedz z ID: 2');
         }
         if (odpowiedz == 3) {
             message.channel.send('Nie dla psa, dla pana to.');
             console.log('Odpowiedz z ID: 3');
         }
         if (odpowiedz == 4) {
             message.channel.send('Tak.');
             console.log('Odpowiedz z ID: 4');
         }
         if (odpowiedz == 5) {
             message.channel.send('Nie.');
             console.log('Odpowiedz z ID: 5');
         }
         if (odpowiedz == 6) {
             message.channel.send('O co ci chodzi?');
             console.log('Odpowiedz z ID: 6');
         }
         if (odpowiedz == 7) {
             message.channel.send('Nie przesadzasz czasem?');
             console.log('Odpowiedz z ID: 7');
         }
         if (odpowiedz == 8) {
             message.channel.send('Teraz nie przeszkadzaj, mam ważną robotę.');
             console.log('Odpowiedz z ID: 8');
         }
     }
});
