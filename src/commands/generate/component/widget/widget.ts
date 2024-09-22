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
      target: `${componentPath}.widget.html`,
      props: { name: componentName, ...strings }
    });

    template.generate({
      template: 'component.template.scss.ejs',
      target: `${componentPath}.widget.scss`
    });

    template.generate({
      template: 'component.template.ts.ejs',
      target: `${componentPath}.widget.ts`,
      props: {
        type: 'widget',
        name: componentName,
        ...strings
      }
    });

    printCreated(print, `${componentPath}.widget.html`);
    printCreated(print, `${componentPath}.widget.scss`);
    printCreated(print, `${componentPath}.widget.ts`);
  }
};

module.exports = COMMAND;
