import fs from 'fs'
import ramda from 'ramda';
export const addFiles = (req, res) => {

  let body: Buffer[] = [];
  let files = [];

  req.on('data', (chunk: Buffer) => {
    body = ramda.append(chunk, body);
  });
  req.on('end', () => {
    const buffer = Buffer.concat(body);
    const contentType = req.headers['content-type'];
    const boundary = contentType.split('; ')[1].split('=')[1];
    const bodyString = buffer.toString();
    const parts = bodyString.split(`--${boundary}`);
    parts.forEach((part) => {
      const stringifyBodyEnd = part.indexOf('\n');
      const stringifyBody = part.substring(0);
      const bodyMatch = stringifyBody.match(/fileName="(.*)"/);
      const fileName = bodyMatch[0].split('=')[1];
      console.log('part', part)
      // Extract the content of the file from the body of the part
      const content = part.substring(stringifyBodyEnd + 4, part.length - 2);
      fs.writeFile(`./assets/uploads/${fileName}`, content, (err) => {
        if (err) {
          console.error('Error', err);
          throw err;
        }
        console.log(`file ${fileName} is saved`);
      });
      files = ramda.append(fileName, files);
    })
    res.send(`files ${files.join(', ')} are saved successfully`);
  })
}

export const addUser = (req, res) => {
  const folderName = new Date().toDateString();
  fs.rename('./assets/upload/RecycleBin', './assets/upload/' + folderName, (err) => {
    if (err) throw err;
    res.send('User successfully saved!');
  });
}