import { GluegunCommand, GluegunToolbox } from 'gluegun';

import { printVersion } from '../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'version',
  alias: ['v', '-v', '--version', '-version'],
  description: 'Mostra a versão do NgxDevs',
  run: async ({ print }: GluegunToolbox) => {
    const version = require('../../package.json').version;
    printVersion(print, version);
  }
};

module.exports = COMMAND;
