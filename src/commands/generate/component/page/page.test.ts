import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('[Commands: generate page component]', () => {
  const name = 'gpc';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(`${name}`);
  });

  test('should generate a page component with 3 files', async () => {
    await runNgxdCLI(`g c p ${name}`);

    const html = filesystem.read(`${name}/${name}.page.html`);
    const scss = filesystem.read(`${name}/${name}.page.scss`);
    const ts = filesystem.read(`${name}/${name}.page.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
  });

  test('should generate a page component html with default template <p>sample works</p>', async () => {
    await runNgxdCLI(`g c p ${name}`);
    const html = filesystem.read(`${name}/${name}.page.html`);

    expect(html).toContain(`<p>${name} works</p>`);
  });

  test('should generate a page component with correct templateUrl: and styleUrls ', async () => {
    await runNgxdCLI(`g c p ${name}`);

    const ts = filesystem.read(`${name}/${name}.page.ts`);

    expect(ts).toContain(`templateUrl: './${name}.page.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.page.scss']`);
  });
});
