import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Service] => [Api]', () => {
  const TESTING_DIR = '__GSA_TEST__';
  const COMMAND = 'g s a';

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

  test('should generate a api service with 2 files', async () => {
    const name = 'gsa-base-fruit';
    await runNgxdCLI(`${COMMAND} ${name}`);

    const ts = filesystem.read(`${name}/${name}.api.ts`);
    const spec = filesystem.read(`${name}/${name}.api.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();
    filesystem.remove(`${name}`);
  });

  test('should generate a api service at given path', async () => {
    const name = 'fruit1';
    const path = `${TESTING_DIR}/services`;

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.api.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.api.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();

    filesystem.remove(TESTING_DIR);
  });

  test('should generate a api service with correct content ', async () => {
    const name = 'fruit2';
    const path = `${TESTING_DIR}/services`;

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.api.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.api.spec.ts`);

    expect(ts).toContain(`import { Injectable } from '@angular/core'`);
    expect(ts).toContain(`@Injectable({`);
    expect(ts).toContain(`providedIn: 'root'`);
    expect(ts).toContain(`export class Fruit2Api {`);

    expect(spec).toContain("describe('Fruit2Api', () => {");
    expect(spec).toContain("it('should be created', () => {");
    expect(spec).toContain('service = TestBed.inject(Fruit2Api);');

    filesystem.remove(`${name}`);
  });
});
