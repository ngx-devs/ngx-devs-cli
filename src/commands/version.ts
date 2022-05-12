import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { PackageJSON } from 'gluegun/build/types/toolbox/meta-types';

import { printVersion } from '../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'version',
  alias: ['v', '-v', '--version', '-version'],
  description: 'Mostra a versão do NgxDevs',
  run: async ({ print }: GluegunToolbox) => {
    const packageJson: PackageJSON = require('../../package.json');
    const version = packageJson?.version;
    printVersion(print, version);
  }
};

module.exports = COMMAND;
