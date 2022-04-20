import { filesystem, system } from 'gluegun';

const src = filesystem.path(__dirname, '..');

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'ngx-devs-cli') + ` ${cmd}`);

describe('[Commands: generate page component]', () => {
  afterEach(() => {
    filesystem.remove('sample');
  });

  test('should generate a page component with 3 files', async () => {
    await cli('g c p sample');

    const html = filesystem.read('sample/sample.page.html');
    const scss = filesystem.read('sample/sample.page.scss');
    const ts = filesystem.read('sample/sample.page.ts');

    expect(html).toBeDefined();
    expect(scss).toBeDefined();
    expect(ts).toBeDefined();
  });

  test('should generate a page component html with default template <p>sample works</p>', async () => {
    await cli('g c p sample');

    const html = filesystem.read('sample/sample.page.html');
    expect(html).toContain('<p>sample works</p>');
  });

  test('should generate a page component with correct templateUrl: and styleUrls ', async () => {
    await cli('g c p sample');

    const ts = filesystem.read('sample/sample.page.ts');

    expect(ts).toContain(`templateUrl: './sample.page.html'`);
    expect(ts).toContain(`styleUrls: ['./sample.page.scss']`);
  });
});
