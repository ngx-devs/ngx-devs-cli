import { GluegunCommand, GluegunToolbox, strings } from 'gluegun';

import { getEntityName, getEntityPath, printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'ng-simple-state',
  alias: ['sst'],
  description: 'cria uma store do tipo NgSimpleState',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    const storeName = parameters.first ?? (await getEntityName(prompt, 'store'));
    const storePath = getEntityPath(path, storeName);

    function toConstantCase(str: string) {
      return str.replace(/([A-Z])/g, '_$1').toUpperCase();
    }

    const nameConstantCase = toConstantCase(storeName);

    template.generate({
      template: 'ng-simple-state.template.ts.ejs',
      target: `${storePath}.store.ts`,
      props: {
        type: 'store',
        name: storeName,
        nameConstantCase,
        ...strings,
        toConstantCase
      }
    });

    template.generate({
      template: 'ng-simple-state.template.spec.ts.ejs',
      target: `${storePath}.store.spec.ts`,
      props: {
        type: 'store',
        name: storeName,
        ...strings
      }
    });

    printCreated(print, `${storePath}.store.ts`);
    printCreated(print, `${storePath}.store.spec.ts`);
  }
};

module.exports = COMMAND;
