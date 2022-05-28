import { GluegunCommand, GluegunToolbox, strings } from 'gluegun';

import {
    getComponentName, getComponentPath, printCreated
} from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'common',
  alias: ['c'],
  description: 'cria um componente Angular de tipo Common',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    const componentName = parameters.first ?? (await getComponentName(prompt));
    const componentPath = getComponentPath(path, componentName);

    template.generate({
      template: 'component.template.html.ejs',
      target: `${componentPath}.component.html`,
      props: { name: componentName, ...strings }
    });

    template.generate({
      template: 'component.template.scss.ejs',
      target: `${componentPath}.component.scss`
    });

    template.generate({
      template: 'component.template.ts.ejs',
      target: `${componentPath}.component.ts`,
      props: {
        type: 'component',
        name: componentName,
        ...strings
      }
    });

    printCreated(print, `${componentPath}.component.html`);
    printCreated(print, `${componentPath}.component.scss`);
    printCreated(print, `${componentPath}.component.ts`);
  }
};

module.exports = COMMAND;
