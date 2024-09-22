import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Page]', () => {
  const TESTING_DIR = '__GWC_TEST__';
  const COMMAND = 'g c p';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a page component with 3 files', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcp-3-files';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.page.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.page.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.page.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(TESTING_DIR);
  });

  test('should generate a page component html with default template <p>sample works</p>', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcp-default-template';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.page.html`);

    expect(html).toContain(`<p>${name} works</p>`);

    filesystem.remove(TESTING_DIR);
  });

  test('should generate a page component with correct templateUrl: and styleUrls ', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcp-template-style';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.page.ts`);

    expect(ts).toContain(`templateUrl: './${name}.page.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.page.scss']`);

    filesystem.remove(TESTING_DIR);
  });

  test('should contain  "standalone: true" on component decorator by default', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcp-standalone-true';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.page.ts`);

    expect(ts).toContain(`standalone: true`);

    filesystem.remove(TESTING_DIR);
  });
});
