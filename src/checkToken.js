const fs = require('fs');
const AdmZip = require('adm-zip');
const otherTokenRegex = null

const green = "\x1b[32m"
const reset = "\x1b[0m"
const blue = "\x1b[34m"
const red = "\x1b[31m"
let path = './data/tokens.txt'
if(!otherTokenRegex)  {
  console.log(red + "(/) Please set your regex in checkToken.js" + reset)
  process.exit(1)
}

const acceptedName = ['js','json','py','ts','php','java','c','cpp','go','lua','env']
function checkFilesInZipForRegex(zipFilePath) {
  try {
    const zip = new AdmZip(zipFilePath);

    const zipEntries = zip.getEntries();
    fs.unlinkSync(zipFilePath)
    let found = false;

    for (const zipEntry of zipEntries) {
      if (!zipEntry.isDirectory) {
        const fileExtension = zipEntry.entryName.split('.').pop();
        if (!acceptedName.includes(fileExtension)) {
          continue;
        }
        const fileContent = zip.readFile(zipEntry);
        
        const fileContentString = fileContent.toString('utf-8');
        if ( otherTokenRegex.test(fileContentString)) {
            found = true
          console.log(blue + "(/) Token found",  otherTokenRegex.exec(fileContentString)[0] + reset)
          if(!fs.existsSync(path)) {
            console.log(green + "(/) Creating tokens.txt" + reset)
            fs.writeFile(path, otherTokenRegex.exec(fileContentString)[0] + "\n", function (err) {
            if (err) throw err;
            console.log(green + "(/) Successfully created tokens.txt" + reset)
            });
           
        } else { 

            fs.appendFile('tokens.txt', otherTokenRegex.exec(fileContentString)[0] + "\n", function (err) {
            if (err) throw err;
            });
          }
        } else {
            
        }
      }
    }
    if (!found) {
        console.log(red+ "(/) No tokens found" + reset)
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

module.exports =checkFilesInZipForRegex

