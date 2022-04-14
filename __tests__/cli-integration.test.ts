import { filesystem, system } from 'gluegun';
import { PackageJSON } from 'gluegun/build/types/toolbox/meta-types';

const src = filesystem.path(__dirname, '..');

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'ngx-devs-cli') + ` ${cmd}`);

describe('[Commands: version]', () => {
  test('should output package.json version', async () => {
    const packageJson: PackageJSON = require('../package.json');
    const version = packageJson?.version;
    const output = await cli('-v');
    expect(output).toContain(version);
  });
});
