import { GluegunCommand, GluegunToolbox, strings } from 'gluegun';

import { getComponentName, getEntityPath, printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'dialog',
  alias: ['d'],
  description: 'cria um componente Angular de tipo Dialog',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    const componentName = parameters.first ?? (await getComponentName(prompt));
    const componentPath = getEntityPath(path, componentName);

    template.generate({
      template: 'component.template.html.ejs',
      target: `./${componentPath}.dialog.html`,
      props: { name: componentName, ...strings }
    });

    template.generate({
      template: 'component.template.ts.ejs',
      target: `./${componentPath}.dialog.ts`,
      props: {
        type: 'dialog',
        name: componentName,
        ...strings
      }
    });

    template.generate({
      template: 'component.template.scss.ejs',
      target: `./${componentPath}.dialog.scss`
    });

    printCreated(print, `${componentPath}.dialog.html`);
    printCreated(print, `${componentPath}.dialog.ts`);
    printCreated(print, `${componentPath}.dialog.scss`);
  }
};

module.exports = COMMAND;
