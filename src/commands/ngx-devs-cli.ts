import { GluegunCommand } from 'gluegun';

import { ASCII_ART } from '../utils/cli-ascii.const';

const COMMAND: GluegunCommand = {
  name: 'ngx-devs-cli',
  alias: ['ngxd'],
  description: 'Inicializa a CLI do NgxDevs',
  run: async (toolbox) => {
    const { print } = toolbox
    const version = require('../../package.json').version

    print.info(ASCII_ART)
    print.info(`  version: ${version}`)
    print.divider()

    print.highlight('Como Utilizar:')
    print.newline()

    print.info('  ngxd <command>')
    print.info('  ngxd <command> [options]')
    print.divider()

    print.highlight('Comandos:')
    print.printCommands(toolbox)
  },
}

module.exports = COMMAND
