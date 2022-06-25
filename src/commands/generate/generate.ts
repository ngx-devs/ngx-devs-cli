import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { findCommand } from '../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'generate',
  description: 'Cria uma nova entidade',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const { prompt } = toolbox;

    const GENERATE_MODEL_TYPE_QUESTION = 'Qual o tipo de entidade que você deseja criar?';

    const GENERATE_MODEL_TYPE_OPTIONS = ['component', 'directive', 'guard', 'interceptor', 'module', 'store'];

    const modelTypeResponse: GluegunAskResponse = await prompt.ask({
      type: 'select',
      name: 'type',
      message: GENERATE_MODEL_TYPE_QUESTION,
      choices: GENERATE_MODEL_TYPE_OPTIONS
    });

    const command = findCommand(toolbox, modelTypeResponse.type);
    command?.run(toolbox);
  }
};

module.exports = COMMAND;
