const fs = require('fs');

// Create a writable stream with the 'a' flag for appending
const writeStream = fs.createWriteStream('newfile.txt', { flags: 'a' });

// Write data to the stream
writeStream.write('hello world\n', 'utf8', (err) => {
  if (err) {
    console.error('Error writing to stream:', err);
  } else {
    console.log('Write completed.');
  }
});

// End the stream
writeStream.end();

// Handle the 'finish' event
writeStream.on('finish', () => {
  console.log('Write stream finished.');
});

// Handle the 'error' event
writeStream.on('error', (err) => {
  console.error('Stream error:', err);
});
