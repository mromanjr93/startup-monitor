const screenshot = require('screenshot-desktop');
const fs = require('fs');

var zipFolder = require('zip-folder');

setInterval(() => {
    fs.readdir('/home/marcelo/Pictures/temp', (err, files) => {
        console.log(files.length);
        if (files.length == 10) {
            const dir = new Date().getTime();
            zipFolder('/home/marcelo/Pictures/temp', `/home/marcelo/Pictures/zips/${dir}.zip`, function (err) {
                if (err) {
                    console.log('oh no!', err);
                } else {
                    console.log('EXCELLENT');
                    files.forEach((file) => {
                        fs.unlinkSync(`/home/marcelo/Pictures/temp/${file}`);
                    });
                }
            });
        }

        screenshot().then((img) => {
            // img: Buffer filled with jpg goodness
            // ...
            const file = new Date().getTime();
            console.log(img);
            fs.writeFile(`/home/marcelo/Pictures/temp/${file}.jpg`, img, (err) => {
                console.log(err);
            })
        }).catch((err) => {
            // ...
        });
    });

}, 30000);
