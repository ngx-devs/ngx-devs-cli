import { filesystem, system } from 'gluegun';

const src = filesystem.path(__dirname, '..');

const cli = async (cmd) => system.run('node ' + filesystem.path(src, 'bin', 'ngx-devs-cli') + ` ${cmd}`);

describe('[CLI]', () => {
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

  describe('[Commands: generate widget component]', () => {
    afterEach(() => {
      filesystem.remove('sample');
    });

    test('should generate a widget component on provided path', async () => {
      await cli('g c w sample --path=sample-project/components');

      const path = 'sample-project/components/sample';
      const html = filesystem.read(`${path}/sample.component.html`);
      const scss = filesystem.read(`${path}/sample.component.scss`);
      const ts = filesystem.read(`${path}/sample.component.ts`);
      const widgetModule = filesystem.read('sample-project/components/sample/sample.widget.module.ts');

      expect(html).toBeDefined();
      expect(scss).toBeDefined();
      expect(ts).toBeDefined();
      expect(widgetModule).toBeDefined();

      filesystem.remove('sample-project');
    });

    test('should generate widget component with 4 files', async () => {
      await cli('g c w sample');

      const html = filesystem.read('sample/sample.component.html');
      const scss = filesystem.read('sample/sample.component.scss');
      const ts = filesystem.read('sample/sample.component.ts');
      const widgetModule = filesystem.read('sample/sample.widget.module.ts');

      expect(html).toBeDefined();
      expect(scss).toBeDefined();
      expect(ts).toBeDefined();
      expect(widgetModule).toBeDefined();
    });

    test('should generate widget component html with default template <p>sample works</p>', async () => {
      await cli('g c w sample');

      const html = filesystem.read('sample/sample.component.html');

      expect(html).toContain('<p>sample works</p>');
    });

    test('should generate a widget component with correct templateUrl: and styleUrls ', async () => {
      await cli('g c w sample');

      const ts = filesystem.read('sample/sample.component.ts');

      expect(ts).toContain(`templateUrl: './sample.component.html'`);
      expect(ts).toContain(`styleUrls: ['./sample.component.scss']`);
    });
  });
});
