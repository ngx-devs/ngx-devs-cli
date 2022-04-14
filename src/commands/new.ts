import { GluegunCommand, GluegunToolbox } from 'gluegun';

const COMMAND: GluegunCommand = {
  name: 'new',
  alias: ['n'],
  description: 'Cria um novo projeto Angular',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox

    const name = parameters.first

    await generate({
      template: 'model.ts.ejs',
      target: `models/${name}-model.ts`,
      props: { name },
    })

    info(`Generated file at models/${name}-model.ts`)
  },
}

module.exports = COMMAND
