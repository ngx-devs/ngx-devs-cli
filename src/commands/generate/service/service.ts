import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { findCommand } from '../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'service',
  alias: ['s'],
  description: 'Cria um serviço Angular',

  run: async (toolbox: GluegunToolbox) => {
    const { parameters, prompt } = toolbox;

    const componentName = parameters.first;

    const QUESTION = 'Qual tipo de serviço você deseja criar?';
    const TYPES = ['common', 'api'];

    const componentTypeResponse: GluegunAskResponse = await prompt.ask({
      type: 'select',
      name: 'type',
      message: QUESTION,
      choices: TYPES
    });

    const componentType = componentTypeResponse.type;
    const command = findCommand(toolbox, componentType);

    toolbox.parameters.first = componentName;
    command?.run(toolbox);
  }
};

module.exports = COMMAND;
