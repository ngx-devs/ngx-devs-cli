import { filesystem, system } from 'gluegun';
import { PackageJSON } from 'gluegun/build/types/toolbox/meta-types';

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'ngx-devs-cli') + ` ${cmd}`)

describe('[Commands: version]', () => {
  test('should output package.json version', async () => {
    const packageJson: PackageJSON = filesystem.read(
      `${src}/package.json`,
      'json'
    )

    const expectedVersion = packageJson.version
    const output = await cli('--version')

    expect(output).toContain(expectedVersion)
  })
})
