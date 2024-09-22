import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Widget]', () => {
  const TESTING_DIR = '__GWC_TEST__';
  const COMMAND = 'g c w';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a widget component on provided path', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'sample-widget';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.widget.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.widget.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.widget.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(TESTING_DIR);
  });

  test('should generate widget component html with default template <p>sample works</p>', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'template-sample-widget';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.widget.html`);

    expect(html).toContain(`<p>${name} works</p>`);

    filesystem.remove(TESTING_DIR);
  });

  test('should generate a widget component with correct templateUrl: and styleUrls ', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'template-style-sample-widget';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.widget.ts`);

    expect(ts).toContain(`templateUrl: './${name}.widget.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.widget.scss']`);

    filesystem.remove(TESTING_DIR);
  });

  test('should contain  "standalone: true" on component decorator by default', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'standalone-sample-widget';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.widget.ts`);

    expect(ts).toContain(`standalone: true`);
  });
});
