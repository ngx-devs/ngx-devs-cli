import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('[Commands: generate dialog component]', () => {
  const name = 'gdc';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(`${name}`);
  });

  test('should generate a dialog component with 3 files', async () => {
    await runNgxdCLI(`g c d ${name}`);

    const html = filesystem.read(`${name}/${name}.dialog.html`);
    const scss = filesystem.read(`${name}/${name}.dialog.scss`);
    const ts = filesystem.read(`${name}/${name}.dialog.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
  });

  test('should generate a dialog component html with default template <p>sample works</p>', async () => {
    await runNgxdCLI(`g c d ${name}`);
    const html = filesystem.read(`${name}/${name}.dialog.html`);

    expect(html).toContain(`<p>${name} works</p>`);
  });

  test('should generate a dialog component with correct templateUrl: and styleUrls ', async () => {
    await runNgxdCLI(`g c d ${name}`);

    const ts = filesystem.read(`${name}/${name}.dialog.ts`);

    expect(ts).toContain(`templateUrl: './${name}.dialog.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.dialog.scss']`);
  });
});
