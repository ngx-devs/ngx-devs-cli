import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'common',
  alias: ['c'],
  description: 'cria um serviço Angular',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template, strings } = toolbox;

    let serviceName = parameters.first;

    if (!serviceName) {
      const response: GluegunAskResponse = await prompt.ask({
        type: 'input',
        name: 'serviceName',
        message: 'Qual o nome do serviço?',
        validate: (value: string) => {
          if (!value) {
            return 'O nome do serviço não pode ser vazio';
          }

          return true;
        }
      });

      serviceName = response.serviceName;
    }

    const serviceNameKebab = strings.kebabCase(serviceName);

    template.generate({
      template: 'service.template.ts.ejs',
      target: `./${serviceNameKebab}/${serviceNameKebab}.service.ts`,
      props: {
        type: 'service',
        name: serviceName,
        ...strings
      }
    });

    template.generate({
      template: 'service.template.spec.ts.ejs',
      target: `./${serviceNameKebab}/${serviceNameKebab}.service.spec.ts`,
      props: {
        type: 'service',
        name: serviceName,
        ...strings
      }
    });

    printCreated(print, `${serviceNameKebab}/${serviceNameKebab}.service.ts`);
    printCreated(print, `${serviceNameKebab}/${serviceNameKebab}.service.spec.ts`);
  }
};

module.exports = COMMAND;
