"use strict";
if (!process.env.disable_dotenv) {
    require('dotenv').config();
}
const express = require('express'),
    bodyParser = require('body-parser'),
    config = require("./lib/config"),
    voiceBotLib = require('./lib/telegramBot'),
    fs = require('fs'),
    cluster = require('cluster');

let bots_array = [];
for (const key in config.bots) {
    bots_array.push(new voiceBotLib(key));
}

if (cluster.isMaster) {
    for (var i = 0; i < config.cores; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        if (worker.isDead) {
            console.log(`Worker ${worker.id} died, spawning another process.`);
            cluster.fork();
        }
    });
} else {
    let app = express();
    app.use(bodyParser.json());
    bots_array.forEach(bot => {
        app.post('/' + bot.config.path, function (req, res) {
            if (req.body && req.body.update_id) {
                res.status(200).end();
                if (req.body && (req.body.message || req.body.channel_post)) {
                    bot.processCommand(req.body.message || req.body.channel_post);
                }
            } else {
                console.log(`############# Unknown access to ${bot.name} bot endpoint #############`);
                console.log(req.body);
                res.status(404).end();
            }
        });
    });
    app.get(config.publicDir + '/:botname/:file', function (req, res) {
        res.setHeader('Cache-Control', 'public, max-age=604800');
        fs.readdir(__dirname + config.publicDir + '/' + req.params.botname, function (err, files) {
            if (!err && files && files.length) {
                let file = files.find(fn => {
                    return fn.split('.')[0] == req.params.file;
                });
                res.sendFile(__dirname + config.publicDir + '/' + req.params.botname + '/' + file);
            } else {
                res.status(500).end();
            }
        });
    });
    app.get('/refreshwebhooks', (req, res) => {
        res.status(200).end();
        bots_array.forEach(bot => {
            bot.delWebhook(function (body) {
                console.log(JSON.stringify(body));
                bot.setWebhook();
            });
            bot.setCommands(data => console.log(data));
        });
    });
    app.all('*', (req, res) => {
        res.sendStatus(404).end();
    });
    app.listen(config.port, function () {
        console.log(`Process #${process.pid} listening to port: ${config.port}`);
    });
}