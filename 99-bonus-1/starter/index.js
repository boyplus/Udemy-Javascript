const fs = require('fs');
const http = require('http');
const url = require('url');


//we can get the now directory by using __dirname
// console.log(__dirname);

//read the json file from local file
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
// console.log(json);

//make the json to be an object 
const laptopData = JSON.parse(json);
// console.log(laptopData);
// console.log(typeof laptopData);



const server = http.createServer((req, res) => {
    // url.parse(res);
    // const query = url.parse(req.url, true);
    // console.log(query);
    const pathName = url.parse(req.url, true).pathname;
    console.log(pathName);

    const query = url.parse(req.url, true).query;
    const id = query.id;
    // console.log(id);

    //PRODUCT iverview
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map((el) => replaceTemplate(data, el)).join();
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                // console.log(cardsOutput);
                res.end(overviewOutput);
            });
        });
    }

    //LAPTOP detail
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html' });
        // res.end(`This is the laptop page for laptop ${id}`);

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    }

    //IAMGE
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(data);

        });
    }
    //URL not found
    else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end('URL was not found on the website!');
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for request');
});

function replaceTemplate(originalHTML, laptop) {
    let output = originalHTML.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}
