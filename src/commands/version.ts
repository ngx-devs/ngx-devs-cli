import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { PackageJSON } from 'gluegun/build/types/toolbox/meta-types';

import { printCreated } from '../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'version',
  alias: ['v', '-v', '--version', '-version'],
  description: 'Cria um componente Angular de tipo Page',
  run: async ({ print }: GluegunToolbox) => {
    const packageJson: PackageJSON = require('../package.json');
    const version = packageJson?.version;
    printCreated(print, version);
  }
};

module.exports = COMMAND;
