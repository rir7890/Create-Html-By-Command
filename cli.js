#!/usr/bin/env node
const express = require("express");
const os = require("os");
const { Command } = require("commander");
const { error } = require("console");
const app = express();
const program = new Command();
const username = os.userInfo().username;
const generateFile = require("./generateFIle.js");
app.use(express.json());

program
  .name("mycli")
  .description("A simple Cli tool to generate html file")
  .version("1.0.0");

program
  .command("Hi")
  .description("Greet the specified user")
  .option("-h, --help", "Print the help message")
  .action((options) => {
    if (options.help) {
      console.log(
        `visit our official github pagehttps://github.com/tj/commander.js`
      );
    } else {
      console.log(`Hello, ${username}`);
    }
  });

program
  .description("Get the help from the command package team github")
  .option("-h, --help", "Print the help message")
  .action((options) => {
    if (options.help) {
      console.log(
        `visit our official github pagehttps://github.com/tj/commander.js`
      );
    } else {
      console.log("Enter the correct command");
    }
  });

program
  .command("server")
  .description("Start running the server")
  .action(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  });

const fileGenerate = new generateFile();

program
  .command("create")
  .description("Creating the html file")
  .option("-fn,--filename <filename>", "filename of html creation")
  .option("-c,--content <content>", "content for html")
  .option("-t,--title <title>", "title for html heading")
  .action(async (options) => {
    if (!options.filename || !options.content || !options.title) {
      console.error("Error: Not all the values are their to creating the html");
      process.exit(1);
    } else {
      await fileGenerate.generateHtmlFile(
        options.filename,
        options.title,
        options.content
      );
      console.log("Html file is created");
    }
  });

program.parse(process.argv);
