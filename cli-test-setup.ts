import { filesystem, system } from 'gluegun';

export const cli = async (cmd) => system.run('node ' + filesystem.path(__dirname, 'bin', 'ngx-devs-cli') + ` ${cmd}`);
