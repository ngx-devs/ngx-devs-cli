import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Component] => [Dialog]', () => {
  const TESTING_DIR = '__GDC_TEST__';
  const COMMAND = 'g c d';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a dialog component with 3 files', async (done) => {
    const name = 'gdc-base-fruit';
    await runNgxdCLI(`${COMMAND} ${name}`);

    const html = filesystem.read(`${name}/${name}.dialog.html`);
    const scss = filesystem.read(`${name}/${name}.dialog.scss`);
    const ts = filesystem.read(`${name}/${name}.dialog.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();

    filesystem.remove(name);
    done();
  });

  test('should generate a dialog component on provided path', async (done) => {
    const path = `${TESTING_DIR}/components`;
    const name = 'fruit1';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.dialog.html`);
    const scss = filesystem.read(`${path}/${name}/${name}.dialog.scss`);
    const ts = filesystem.read(`${path}/${name}/${name}.dialog.ts`);

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
    done();
  });

  test('should generate a dialog component html with default template <p>fruit2 works</p>', async (done) => {
    const path = `${TESTING_DIR}/components`;
    const name = 'fruit2';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const html = filesystem.read(`${path}/${name}/${name}.dialog.html`);
    expect(html).toContain(`<p>${name} works</p>`);
    done();
  });

  test('should generate a dialog component with correct templateUrl: and styleUrls ', async (done) => {
    const path = `${TESTING_DIR}/components`;
    const name = 'fruitThree';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.dialog.ts`);

    expect(ts).toContain(`templateUrl: './fruit-three.dialog.html'`);
    expect(ts).toContain(`styleUrls: ['./fruit-three.dialog.scss']`);
    done();
  });
});
