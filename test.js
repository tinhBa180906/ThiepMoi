const fs = require('fs');
const config = fs.readFileSync('./src/models/eventConfig.js', 'utf8');
const match = config.match(/guestbookMessage:\s*\`([\s\S]*?)\`,/);
if (match) {
  const str = match[1];
  const arr = str.split(/\n+/).filter(Boolean);
  console.log('length:', arr.length);
  console.log('content:', JSON.stringify(arr, null, 2));
} else {
  console.log('no match');
}
