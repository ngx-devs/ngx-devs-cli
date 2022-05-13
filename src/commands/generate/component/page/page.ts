import { GluegunCommand, GluegunToolbox } from 'gluegun';

import {
    getComponentName, getComponentPath, printCreated
} from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'page',
  alias: ['p'],
  description: 'cria um componente Angular de tipo Page',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template, strings, prompt } = toolbox;
    const {
      options: { path }
    } = parameters;

    const componentName = parameters.first ?? (await getComponentName(prompt));
    const componentPath = getComponentPath(path, componentName);

    template.generate({
      template: 'component.template.html.ejs',
      target: `${componentPath}.page.html`,
      props: { name: componentName, ...strings }
    });

    template.generate({
      template: 'component.template.ts.ejs',
      target: `${componentPath}.page.ts`,
      props: {
        type: 'page',
        name: componentName,
        ...strings
      }
    });

    template.generate({
      template: 'component.template.scss.ejs',
      target: `${componentPath}.page.scss`
    });

    printCreated(print, `${componentName}/${componentName}.page.html`);
    printCreated(print, `${componentName}/${componentName}.page.ts`);
    printCreated(print, `${componentName}/${componentName}.page.scss`);
  }
};

module.exports = COMMAND;
