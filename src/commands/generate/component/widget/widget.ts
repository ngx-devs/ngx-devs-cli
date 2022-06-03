import { GluegunCommand, strings } from 'gluegun';

import { getComponentName, getEntityPath, printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'widget',
  alias: ['w'],
  description: 'cria um componente Angular do tipo widget',
  run: async (toolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    const componentName = parameters.first ?? (await getComponentName(prompt));
    const componentPath = getEntityPath(path, componentName);

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

    template.generate({
      template: 'widget.module.template.ts.ejs',
      target: `${componentPath}.widget.module.ts`,
      props: {
        type: 'component',
        name: componentName,
        ...strings
      }
    });

    printCreated(print, `${componentPath}.component.html`);
    printCreated(print, `${componentPath}.component.scss`);
    printCreated(print, `${componentPath}.component.ts`);
    printCreated(print, `${componentPath}.widget.module.ts`);
  }
};

module.exports = COMMAND;
