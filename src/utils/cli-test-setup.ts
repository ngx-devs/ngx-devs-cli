import { filesystem, system } from 'gluegun';

const src = filesystem.path(__dirname, '..', '..');

export async function runNgxdCLI(cmd: string): Promise<string> {
  return system.run('node ' + filesystem.path(src, 'bin', 'ngx-devs-cli') + ` ${cmd}`);
}
