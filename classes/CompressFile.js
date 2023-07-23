const sharp = require('sharp');
const convert = require('heic-convert');
const { promisify } = require('util');
const fs = require("fs");
const Response = require("../classes/Response");

class CompressFile {

    constructor(file) {
        this.file = file ? file : null;
    }
    
    async image(){
        try{
          let result = {};
          // To compress the heic image
          if(this.file.type == 'image/heic'){
            const inputBuffer = await promisify(fs.readFile)(this.file.path);
            const outputBuffer = await convert({
              buffer: inputBuffer, // the HEIC file buffer
              format: 'JPEG',      // output format
              quality: 0         // the jpeg compression quality, between 0 and 1
            });
            const ref = `${this.file.originalFilename}_${Date.now()}.webp`;
            result.ref = ref;
            result.blob = outputBuffer;
            return result;
          }
         
        // To compress the jpg and png image
          const ref = `${this.file.originalFilename}_${Date.now()}.webp`;
          let sharpimg = await sharp(this.file.path)
          .webp({quality: 10})
          .toFormat('jpeg')
          .toFile("./uploads/" + ref);
          const blob = fs.readFileSync('./uploads/'+ref);
          result.ref = ref;
          result.blob = blob;  
          return result;
      
        }catch(err){
          console.log("error",err);
          return err;
      }
      }
}

module.exports = CompressFile;