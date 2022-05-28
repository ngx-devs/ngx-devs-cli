import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('[Commands: generate common component]', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should generate a common component with 3 files', async () => {
    const name = 'sample-with-three-files';
    await runNgxdCLI(`g c c ${name}`);

    const html = filesystem.read(`${name}/${name}.component.html`);
    const scss = filesystem.read(`${name}/${name}.component.scss`);
    const ts = filesystem.read(`${name}/${name}.component.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
    filesystem.remove(`${name}`);
  });

  test('should generate a common component html with default template <p>sample works</p>', async () => {
    const name = 'sample-with-default-template';

    await runNgxdCLI(`g c c ${name}`);

    const html = filesystem.read(`${name}/${name}.component.html`);

    expect(html).toContain(`<p>${name} works</p>`);
    filesystem.remove(`${name}`);
  });

  test('should generate a common component with correct templateUrl: and styleUrls ', async () => {
    const name = 'sample-style-template-url';
    await runNgxdCLI(`g c c ${name}`);

    const ts = filesystem.read(`${name}/${name}.component.ts`);

    expect(ts).toContain(`templateUrl: './${name}.component.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.component.scss']`);
    filesystem.remove(`${name}`);
  });
});
