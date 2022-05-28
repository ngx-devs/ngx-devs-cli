import { filesystem, system } from 'gluegun';

const src = filesystem.path(__dirname, '..', '..');
export const runNgxdCLI = async (cmd: string) =>
  system.run('node ' + filesystem.path(src, 'bin', 'ngx-devs-cli') + ` ${cmd}`);
