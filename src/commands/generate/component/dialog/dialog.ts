import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types';

import { printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'dialog',
  alias: ['d'],
  description: 'cria um componente Angular de tipo Dialog',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, prompt, template, strings } = toolbox;

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

    const componentNameKebab = strings.kebabCase(componentName);

    template.generate({
      template: 'component.template.html.ejs',
      target: `./${componentNameKebab}/${componentNameKebab}.dialog.html`,
      props: { name: componentNameKebab, ...strings }
    });

    template.generate({
      template: 'component.template.ts.ejs',
      target: `./${componentNameKebab}/${componentNameKebab}.dialog.ts`,
      props: {
        type: 'dialog',
        name: componentName,
        ...strings
      }
    });

    template.generate({
      template: 'component.template.scss.ejs',
      target: `./${componentNameKebab}/${componentNameKebab}.dialog.scss`
    });

    printCreated(print, `${componentNameKebab}/${componentNameKebab}.dialog.html`);
    printCreated(print, `${componentNameKebab}/${componentNameKebab}.dialog.ts`);
    printCreated(print, `${componentNameKebab}/${componentNameKebab}.dialog.scss`);
  }
};

module.exports = COMMAND;
