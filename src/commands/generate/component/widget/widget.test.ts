import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Widget]', () => {
  const name = 'gwc';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(`${name}`);
  });

  test('should generate a widget component on provided path', async () => {
    const path = 'sample-project/components';
    await runNgxdCLI(`g c w ${name} --path=${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.component.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.component.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.component.ts`);
    const widgetModule = filesystem.read(`${path}/${name}/${name}.widget.module.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
    expect(widgetModule).toBeDefined();

    filesystem.remove('sample-project');
  });

  test('should generate widget component with 4 files', async () => {
    await runNgxdCLI(`g c w ${name}`);

    const html = filesystem.read(`${name}/${name}.component.html`);
    const scss = filesystem.read(`${name}/${name}.component.scss`);
    const ts = filesystem.read(`${name}/${name}.component.ts`);
    const widgetModule = filesystem.read(`${name}/${name}.widget.module.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
    expect(widgetModule).toBeDefined();
  });

  test('should generate widget component html with default template <p>sample works</p>', async () => {
    await runNgxdCLI(`g c w ${name}`);
    const html = filesystem.read(`${name}/${name}.component.html`);

    expect(html).toContain(`<p>${name} works</p>`);
  });

  test('should generate a widget component with correct templateUrl: and styleUrls ', async () => {
    await runNgxdCLI(`g c w ${name}`);

    const ts = filesystem.read(`${name}/${name}.component.ts`);

    expect(ts).toContain(`templateUrl: './${name}.component.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.component.scss']`);
  });
});
