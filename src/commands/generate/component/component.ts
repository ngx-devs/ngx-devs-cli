import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { findCommand } from '../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'component',
  alias: ['c'],
  description: 'Cria um componente Angular',

  run: async (toolbox: GluegunToolbox) => {
    const { parameters, prompt } = toolbox;

    const componentName = parameters.first;

    const QUESTION = 'Qual tipo de componente você deseja criar?';
    const TYPES = ['common', 'page', 'widget', 'layout', 'dialog'];

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
