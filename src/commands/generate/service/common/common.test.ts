import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Service] => [Common]', () => {
  const name = 'gsc';
  const TESTING_DIR = '__GSC_TEST__';
  const COMMAND = 'g s c';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a common service with 2 files', async () => {
    await runNgxdCLI(`${COMMAND} ${name}`);

    const ts = filesystem.read(`${name}/${name}.service.ts`);
    const spec = filesystem.read(`${name}/${name}.service.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();
    filesystem.remove(name);
  });

  test('should generate a common service at given path', async () => {
    const path = `${TESTING_DIR}/src/app/services`;

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.service.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.service.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();

    filesystem.remove(TESTING_DIR);
  });

  test('should generate a common service with correct content ', async () => {
    const name = 'fruit';

    await runNgxdCLI(`${COMMAND} ${name}`);

    const ts = filesystem.read(`${name}/${name}.service.ts`);
    const spec = filesystem.read(`${name}/${name}.service.spec.ts`);

    expect(ts).toContain(`import { Injectable } from '@angular/core'`);
    expect(ts).toContain(`@Injectable({`);
    expect(ts).toContain(`providedIn: 'root'`);
    expect(ts).toContain(`export class FruitService {`);

    expect(spec).toContain("describe('FruitService', () => {");
    expect(spec).toContain("it('should be created', () => {");
    expect(spec).toContain('service = TestBed.inject(FruitService);');

    filesystem.remove(`${name}`);
  });

  test('should contain  "standalone: true" on service decorator by default', async () => {
    const path = `${TESTING_DIR}/src/app/services`;
    const name = 'gsa-standalone-true';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.service.ts`);

    expect(ts).toContain(`standalone: true`);    
    filesystem.remove(`${name}`);
  });
});
