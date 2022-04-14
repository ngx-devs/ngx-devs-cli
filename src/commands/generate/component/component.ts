import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { findCommand } from '../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'component',
  alias: ['c'],
  description: 'Cria um componente Angular de tipo específico',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, prompt } = toolbox

    let componentName = parameters.first

    if (!componentName) {
      const response: GluegunAskResponse = await prompt.ask({
        type: 'input',
        name: 'componentName',
        message: 'Qual o nome do componente?',
        validate: (value: string) => {
          if (!value) {
            return 'O nome do componente não pode ser vazio'
          }

          return true
        },
      })

      componentName = response.componentName
    }

    const QUESTION = 'Qual tipo de componente você deseja criar?'
    const TYPES = ['common', 'page', 'widget', 'layout']

    const componentTypeResponse: GluegunAskResponse = await prompt.ask({
      type: 'select',
      name: 'type',
      message: QUESTION,
      choices: TYPES,
    })

    const componentType = componentTypeResponse.type
    const command = findCommand(toolbox, componentType)

    toolbox.parameters.first = componentName
    command.run(toolbox)
  },
}

module.exports = COMMAND
