import { GluegunCommand, GluegunToolbox, strings } from 'gluegun';

import { getEntityName, getEntityPath, printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'api',
  alias: ['a'],
  description: 'cria um serviço Angular do tipo Api',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    const serviceName = parameters.first ?? (await getEntityName(prompt, 'service'));
    const servicePath = getEntityPath(path, serviceName);

    template.generate({
      template: 'service.template.ts.ejs',
      target: `${servicePath}.api.ts`,
      props: {
        type: 'api',
        name: serviceName,
        ...strings
      }
    });

    template.generate({
      template: 'service.template.spec.ts.ejs',
      target: `${servicePath}.api.spec.ts`,
      props: {
        type: 'api',
        name: serviceName,
        ...strings
      }
    });

    printCreated(print, `${servicePath}.api.ts`);
    printCreated(print, `${servicePath}.api.spec.ts`);
  }
};

module.exports = COMMAND;
