import { server } from './server';

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// https://stackoverflow.com/a/62447944/17163926
process.on('SIGTERM', () => process.exit());
