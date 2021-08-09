const { User } = require('./../models/index');
const bcrypt = require('bcrypt');
const catchAsync = require('./../utils/catchAsync');
var fs = require('fs');
const path = require('path');
var parse = require('csv-parse');
const sequelize = require('../utils/db_connect');

//console.log(User);
let i = 0;
const createUser = catchAsync(async (user) => {
    //let user = req.body;
    //user = JSON.parse(user);
    //console.log(user.password);
    let password = user.password;
    //console.log(process.env.SALT_ROUNDS)
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (err, salt) {
        //console.log('here' + i);
        i++;
        if (err) {
            console.error(err);
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                //console.log(err);
                if (err) {
                    console.error(err);
                } else {
                    user.password = hash;
                    //console.log(hash);
                    User.create(user);
                    console.log(`New user created => ${user.first_name} ${user.last_name}`)
                }
            });
        }
    });

});
//From another project
const csvImport = catchAsync(async () => {
    await sequelize.sync({ force: true });
    console.log('Starting CSV Import 🔧')
    //Hard coded directory has been used.
    //Put your path here...
    var csvData = [];
    const currDir = path.join(__dirname + '/csv/');

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
                    createUser(el);
                })
            });
            fs.createReadStream(currFilePath).pipe(parser);

        }
    });
    //console.log(csvData);

    console.log('Finished Loading CSV 🛠')
});

csvImport();