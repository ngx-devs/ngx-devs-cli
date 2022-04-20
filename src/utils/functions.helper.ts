import { GluegunPrint, GluegunToolbox } from 'gluegun';
import { Command } from 'gluegun/build/types/domain/command';

export function findCommand(
  toolbox: GluegunToolbox,
  commandName: string
): Command {
  return toolbox.runtime.commands.find(
    (command) => command.name === commandName
  );
}

export function printCreated(print: GluegunPrint, message: string) {
  const text =
    print.colors.green('CREATED') + ' ' + print.colors.yellow(message);
  print.info(text);
}

export function printVersion(print: GluegunPrint, version: string) {
  const text = print.colors.green('version: ') + print.colors.yellow(version);
  print.info(text);
}
