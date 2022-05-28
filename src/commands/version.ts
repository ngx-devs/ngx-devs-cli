import { GluegunCommand, GluegunToolbox } from 'gluegun';

import * as packageJson from '../../package.json';
import { printVersion } from '../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'version',
  alias: ['v', '-v', '--version', '-version'],
  description: 'Mostra a versão do NgxDevs',
  run: async ({ print }: GluegunToolbox) => {
    const version = packageJson?.version;
    printVersion(print, version);
  }
};

module.exports = COMMAND;
