import { GluegunCommand, GluegunToolbox } from 'gluegun';

import { printCreated } from '../../../../utils/functions.helper';

const COMMAND: GluegunCommand = {
  name: 'page',
  alias: ['p'],
  description: 'Cria um componente Angular de tipo Page',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template, strings } = toolbox

    const componentName = parameters.first

    template.generate({
      template: 'component.page.html.ejs',
      target: `./${componentName}/${componentName}.page.html`,
      props: { name: componentName, ...strings },
    })

    template.generate({
      template: 'component.page.ts.ejs',
      target: `./${componentName}/${componentName}.page.ts`,
      props: { name: componentName, ...strings },
    })

    template.generate({
      template: 'component.page.scss.ejs',
      target: `./${componentName}/${componentName}.page.scss`,
    })

    printCreated(print, `${componentName}/${componentName}.page.html`)
    printCreated(print, `${componentName}/${componentName}.page.ts`)
    printCreated(print, `${componentName}/${componentName}.page.scss`)
  },
}

module.exports = COMMAND
