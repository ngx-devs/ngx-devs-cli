import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'api',
  alias: ['a'],
  description: 'cria um serviço Angular do tipo Api',
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
      target: `./${serviceNameKebab}/${serviceNameKebab}.api.ts`,
      props: {
        type: 'api',
        name: serviceName,
        ...strings
      }
    });

    template.generate({
      template: 'service.template.spec.ts.ejs',
      target: `./${serviceNameKebab}/${serviceNameKebab}.api.spec.ts`,
      props: {
        type: 'api',
        name: serviceName,
        ...strings
      }
    });

    printCreated(print, `${serviceNameKebab}/${serviceNameKebab}.api.ts`);
    printCreated(print, `${serviceNameKebab}/${serviceNameKebab}.api.spec.ts`);
  }
};

module.exports = COMMAND;
