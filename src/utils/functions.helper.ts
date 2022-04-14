import { GluegunPrint, GluegunToolbox } from 'gluegun';
import { Command } from 'gluegun/build/types/domain/command';

export function findCommand(
  toolbox: GluegunToolbox,
  commandName: string
): Command {
  const command = toolbox.runtime.commands.find(
    (command) => command.name === commandName
  )

  return command
}

export function printCreated(print: GluegunPrint, message: string) {
  const text =
    print.colors.green('CREATED') + ' ' + print.colors.yellow(message)
  print.info(text)
}
