import { build } from 'gluegun';

async function run(argv) {
  const cli = build()
    .brand('ngx-devs-cli')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'ngx-devs-cli-*', hidden: true })
    .exclude([
      'meta',
      'semver',
      'system',
      'http',
      'patching',
      'package-manager'
    ])
    .create();

  const toolbox = await cli.run(argv);
  return toolbox;
}

module.exports = { run };
