import { server } from './server';

server.listen(3000, () => {
  console.log('hue');
});

// https://stackoverflow.com/a/62447944/17163926
process.on('SIGTERM', () => process.exit());
