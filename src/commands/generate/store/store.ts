import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { findCommand } from '../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'store',
  alias: ['st'],
  description: 'Cria uma store para gerenciar o estado da aplicação',

  run: async (toolbox: GluegunToolbox) => {
    const { parameters, prompt } = toolbox;

    const storeName = parameters.first;

    const question = 'Qual tipo de store você deseja criar?';
    const availableTypes = ['ng-simple-state'];

    const storeTypeResponse: GluegunAskResponse = await prompt.ask({
      type: 'select',
      name: 'type',
      message: question,
      choices: availableTypes
    });

    const storeType = storeTypeResponse.type;
    const command = findCommand(toolbox, storeType);

    toolbox.parameters.first = storeName;
    command?.run(toolbox);
  }
};

module.exports = COMMAND;
