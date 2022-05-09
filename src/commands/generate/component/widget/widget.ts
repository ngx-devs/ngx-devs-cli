import { GluegunCommand, strings } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'widget',
  alias: ['w'],
  description: 'cria um componente Angular do tipo widget',
  run: async (toolbox) => {
    const { parameters, print, prompt, template } = toolbox;
    const {
      options: { path }
    } = parameters;

    let componentName = parameters.first;

    if (!componentName) {
      const response: GluegunAskResponse = await prompt.ask({
        type: 'input',
        name: 'componentName',
        message: 'Qual o nome do componente?',
        validate: (value: string) => {
          if (!value) {
            return 'O nome do componente não pode ser vazio';
          }

          return true;
        }
      });

      componentName = response.componentName;
    }

    const componentPath = path
      ? `${path}/${componentName}/${componentName}`
      : `./${componentName}/${componentName}`;

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
    printCreated(print, `${componentPath}.component.ts`);
    printCreated(print, `${componentPath}.component.scss`);
    printCreated(print, `${componentPath}.widget.module.ts`);
  }
};

module.exports = COMMAND;
