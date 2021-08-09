const { User, Article } = require('./../models/index');
const bcrypt = require('bcrypt');
const catchAsync = require('./../utils/catchAsync');
var fs = require('fs');
const path = require('path');
var parse = require('csv-parse');
const sequelize = require('../utils/db_connect');
const readingTime = require('reading-time');

//console.log(User);
let i = 0;
const createUser = catchAsync(async (user) => {
    //passwords prehashed for speed 
    //SALT_ROUNDS=10
    User.create(user);
    console.log(`New user created => ${user.first_name} ${user.last_name}`)
});

const createArticle = catchAsync(async (article) => {
    article.stats = JSON.stringify(readingTime(article.content));
    Article.create(article);
})
//taken from other project
const csvImportUsr = catchAsync(async () => {
    await sequelize.sync({ force: true });
    console.log('Starting CSV Import 🔧')
    //Hard coded directory has been used.
    //Put your path here...
    var csvData = [];
    const currDir = path.join(__dirname + '/csv-usr/');

    // Function to get the filenames present
    // in the directory
    const readdir = (dirname) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, (error, filenames) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(filenames);
                }
            });
        });
    };

    //CSV filter to filter out the csv files
    //in the directory
    const filtercsvFiles = (filename) => {
        return filename.split('.')[1] === 'csv';
    };

    readdir(currDir).then((filenames) => {
        filenames = filenames.filter(filtercsvFiles);

        for (let i = 0; i < filenames.length; i++) {
            let currFilePath = currDir + filenames[i];

            var parser = parse({ columns: true, cast: false }, async function (err, records) {
                for (el of records) {
                    await createUser(el);
                }
            });
            fs.createReadStream(currFilePath).pipe(parser);

        }
    });
    //console.log(csvData);

    console.log('Finished Loading CSV 🛠')
});

//taken from other project
const csvImportArt = catchAsync(async () => {
    //await sequelize.sync({ force: true });
    console.log('Starting CSV Import 🔧')
    //Hard coded directory has been used.
    //Put your path here...
    var csvData = [];
    const currDir = path.join(__dirname + '/csv-art/');

    // Function to get the filenames present
    // in the directory
    const readdir = (dirname) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, (error, filenames) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(filenames);
                }
            });
        });
    };

    //CSV filter to filter out the csv files
    //in the directory
    const filtercsvFiles = (filename) => {
        return filename.split('.')[1] === 'csv';
    };

    readdir(currDir).then((filenames) => {
        filenames = filenames.filter(filtercsvFiles);

        for (let i = 0; i < filenames.length; i++) {
            let currFilePath = currDir + filenames[i];

            var parser = parse({ columns: true, cast: false }, function (err, records) {
                records.forEach((el) => {
                    createArticle(el);
                })
            });
            fs.createReadStream(currFilePath).pipe(parser);

        }
    });
    //console.log(csvData);

    console.log('Finished Loading CSV 🛠')
});

//csvImportUsr();
csvImportArt();