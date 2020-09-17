const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const {compress, RLE} = require('./utils');

let basePath = 'D:\\AppData\\bad_apple\\';
let pixelValue = 10;
let width = 960;
let height = 720;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

let getImageData =  (startX = 0, startY = 0, width, height) => {
    return ctx.getImageData(startX, startY, width, height);
};

function verify(imgIndex) {
    let imgPath = basePath + imgIndex + '.jpg';
    let w = width / pixelValue;
    let h = height / pixelValue;

    loadImage(imgPath).then((img) => {
        ctx.drawImage(img, 0, 0);

        let wBlockCount = Math.ceil(width / pixelValue);
        let hBlockCount = Math.ceil(height / pixelValue);

        let letterArea = [];

        let wRemainder = width % pixelValue;
        let hRemainder = height % pixelValue;
        let lastWidth = wRemainder === 0 ? pixelValue : wRemainder;
        let lastHeight = hRemainder === 0 ? pixelValue : hRemainder;


        for (let j = 0; j < hBlockCount; j++) {
            for (let i = 0; i < wBlockCount; i++) {
                let w = i === wBlockCount - 1 ? lastWidth : pixelValue;
                let h = j === hBlockCount - 1 ? lastHeight : pixelValue;
                let imageData = getImageData(i * pixelValue, j * pixelValue, w, h);
                let color = 0;
                imageData.data.forEach((item, index) => {
                    if (index % 4 !== 3) {
                        color += item;
                    }
                });
                let block = color / 3 / (imageData.data.length / 4) > 128 ? 0 : 1;
                letterArea.push(block);
            }
        }
        return letterArea;
    }).then((letterArea) => {

        for (let i = 0; i < h; i++) {
            console.log(letterArea.slice(i * w  , (i + 1) * w).join(''));
        }
        return letterArea;
    }).then((letterArea) => {
        console.log('\n\ncompress\n\n')
        let compressLetter = compress(letterArea);
        // for (let i = 0; i < h; i++) {
        //     console.log(compressLetter.slice(i * w / 8, (i + 1) * w / 8)
        //         .map(item => item.toString(2).padStart(8, '0')).join(''))
        // }
        console.log(compressLetter);
        return compressLetter;
    }).then((data) => {
        let rleData = RLE(data);
        console.log(rleData);
        return rleData;
    });
}

verify(67);