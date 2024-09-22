import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Service] => [Api]', () => {
  const TESTING_DIR = '__GSA_TEST__';
  const COMMAND = 'g s a';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterAll(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a api service with 2 files', async () => {
    const path = `${TESTING_DIR}/services`;
    const name = 'gsa-2-files';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.api.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.api.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();
  });

  test('should generate a api service at given path', async () => {
    const path = `${TESTING_DIR}/services`;
    const name = 'gsa-provided-path';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.api.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.api.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();
  });

  test('should generate a api service with correct content ', async () => {
    const path = `${TESTING_DIR}/services`;
    const name = 'gsa-correct-content';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.api.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.api.spec.ts`);

    expect(ts).toContain(`import { Injectable } from '@angular/core'`);
    expect(ts).toContain(`@Injectable({`);
    expect(ts).toContain(`providedIn: 'root'`);
    expect(ts).toContain(`export class GsaCorrectContentApi {`);

    expect(spec).toContain("describe('GsaCorrectContentApi', () => {");
    expect(spec).toContain("it('should be created', () => {");
    expect(spec).toContain('service = TestBed.inject(GsaCorrectContentApi);');
  });

  test('should contain  "standalone: true" on service decorator by default', async () => {
    const path = `${TESTING_DIR}/services`;
    const name = 'gsa-standalone-true';
    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.api.ts`);

    expect(ts).toContain(`standalone: true`);
  });
});
