import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Dialog]', () => {
  const TESTING_DIR = '__GDC_TEST__';
  const COMMAND = 'g c d';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterAll(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a dialog component with 3 files', async () => {
    const name = 'gdc-base-fruit';
    await runNgxdCLI(`${COMMAND} ${name}`);

    const html = filesystem.read(`${name}/${name}.dialog.html`);
    const scss = filesystem.read(`${name}/${name}.dialog.scss`);
    const ts = filesystem.read(`${name}/${name}.dialog.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(name);
  });

  test('should generate a dialog component on provided path', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gdc-provided-path';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.dialog.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.dialog.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.dialog.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
  });

  test('should generate a dialog component html with default template <p>gdc-default-template works</p>', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gdc-default-template';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.dialog.html`);
    expect(html).toContain(`<p>${name} works</p>`);
  });

  test('should generate a dialog component with correct templateUrl: and styleUrls ', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gdc-template-style';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.dialog.ts`);

    expect(ts).toContain(`templateUrl: './${name}.dialog.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.dialog.scss']`);
  });
});
