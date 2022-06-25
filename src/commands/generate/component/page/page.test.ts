import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Page]', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should generate a page component with 3 files', async () => {
    const name = 'base-gcp-fruit';
    await runNgxdCLI(`g c p ${name}`);

    const html = filesystem.read(`${name}/${name}.page.html`);
    const scss = filesystem.read(`${name}/${name}.page.scss`);
    const ts = filesystem.read(`${name}/${name}.page.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(name);
  });

  test('should generate a page component on provided path', async () => {
    const name = 'sample-with-path';
    const baseFolder = 'sample-app';
    const path = `${baseFolder}/src/app/components`;

    await runNgxdCLI(`g c p ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.page.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.page.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.page.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(baseFolder);
  });

  test('should generate a page component html with default template <p>sample works</p>', async () => {
    const name = 'sample-with-default-template';
    await runNgxdCLI(`g c p ${name}`);
    const html = filesystem.read(`${name}/${name}.page.html`);

    expect(html).toContain(`<p>${name} works</p>`);
    filesystem.remove(name);
  });

  test('should generate a page component with correct templateUrl: and styleUrls ', async () => {
    const name = 'sample-style-template-url';
    await runNgxdCLI(`g c p ${name}`);

    const ts = filesystem.read(`${name}/${name}.page.ts`);

    expect(ts).toContain(`templateUrl: './${name}.page.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.page.scss']`);
    filesystem.remove(name);
  });
});
