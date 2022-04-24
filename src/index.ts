import { server } from './server';

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https://stackoverflow.com/a/62447944/17163926
process.on('SIGTERM', () => process.exit());
