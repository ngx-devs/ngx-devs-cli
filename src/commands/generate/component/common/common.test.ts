import { filesystem, strings } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Common]', () => {
  const TESTING_DIR = '__GCC_TEST__';
  const COMMAND = 'g c c';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a common component with 3 files', async () => {
    const name = 'gcc-3-files';
    await runNgxdCLI(`g c c ${name}`);

    const html = filesystem.read(`${name}/${name}.component.html`);
    const scss = filesystem.read(`${name}/${name}.component.scss`);
    const ts = filesystem.read(`${name}/${name}.component.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
    filesystem.remove(`${name}`);
  });

  test('should generate a common component on provided path', async () => {
    const name = 'gcc-provided-path';
    const baseFolder = 'sample-app';
    const path = `${baseFolder}/src/app/components`;

    await runNgxdCLI(`g c c ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.component.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.component.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.component.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(baseFolder);
  });

  test('should generate a common component html default template', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcc-default-template';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.component.html`);
    expect(html).toContain(`<p>${name} works</p>`);
  });

  test('should generate a common component with correct templateUrl: and styleUrls ', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcc-template-style';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.component.ts`);

    expect(ts).toContain(`templateUrl: './${name}.component.html'`);
    expect(ts).toContain(`styleUrls: ['./${name}.component.scss']`);
  });

  test('should generate a common component with spec file', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcc-spec';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.component.spec.ts`);

    expect(ts).toBeDefined();
  });

  test('should properly interpolate component name on spec file', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcc-spec-interpolate';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.component.spec.ts`);

    const pascalCaseName = strings.pascalCase(name);

    expect(ts).toContain(`describe('${pascalCaseName}Component', () => {`);
  });

  test('should contain "standalone: true" on component decorator by default', async () => {
    const path = `${TESTING_DIR}/components`;
    const name = 'gcc-standalone';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.component.ts`);

    expect(ts).toContain(`standalone: true`);
  });
});
