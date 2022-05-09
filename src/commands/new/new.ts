import { GluegunCommand, GluegunToolbox } from 'gluegun';

import { printCreated } from '../../utils/functions.helper';

const path = require('path');

const COMMAND: GluegunCommand = {
  name: 'new',
  alias: ['n'],
  description: 'Cria um novo projeto Angular',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, template, print } = toolbox;

    const projectName = parameters.first;

    await template.generate({
      template: 'tsconfig.spec.json.template.ejs',
      target: `./${projectName}/tsconfig.spec.json`,
      props: { projectName },
      directory: path.resolve(__dirname, '../../../src/templates/project')
    });

    printCreated(print, `${projectName}/tsconfig.spec.json`);
  }
};

module.exports = COMMAND;
