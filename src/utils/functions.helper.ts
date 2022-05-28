import { GluegunPrint, GluegunToolbox, strings } from 'gluegun';
import { Command } from 'gluegun/build/types/domain/command';
import { GluegunAskResponse, GluegunPrompt } from 'gluegun/build/types/toolbox/prompt-types';

export function findCommand(toolbox: GluegunToolbox, commandName: string): Command | undefined {
  return toolbox.runtime?.commands?.find((command) => command.name === commandName);
}

export function printCreated(print: GluegunPrint, message: string): void {
  const text = print.colors.green('CREATED') + ' ' + print.colors.yellow(message);
  print.info(text);
}

export function printVersion(print: GluegunPrint, version: string): void {
  const text = print.colors.green('version: ') + print.colors.yellow(version);
  print.info(text);
}

export async function getComponentName(prompt: GluegunPrompt): Promise<string> {
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

  return strings.kebabCase(response.componentName);
}

export function getComponentPath(path: any, componentName: string): string {
  return path ? `${path}/${componentName}/${componentName}` : `./${componentName}/${componentName}`;
}
