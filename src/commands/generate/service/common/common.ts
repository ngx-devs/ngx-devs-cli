import { GluegunCommand, GluegunToolbox, strings } from 'gluegun';

import { getEntityName, getEntityPath, printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'common',
  alias: ['c'],
  description: 'cria um serviço Angular',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    const serviceName = parameters.first ?? (await getEntityName(prompt, 'service'));
    const servicePath = getEntityPath(path, serviceName);

    template.generate({
      template: 'service.template.ts.ejs',
      target: `${servicePath}.service.ts`,
      props: {
        type: 'service',
        name: serviceName,
        ...strings
      }
    });

    template.generate({
      template: 'service.template.spec.ts.ejs',
      target: `${servicePath}.service.spec.ts`,
      props: {
        type: 'service',
        name: serviceName,
        ...strings
      }
    });

    printCreated(print, `${servicePath}.service.ts`);
    printCreated(print, `${servicePath}.service.spec.ts`);
  }
};

module.exports = COMMAND;
