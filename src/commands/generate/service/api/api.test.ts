import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';

describe('Commands: [Generate] => [Service] => [Api]', () => {
  const name = 'gsa';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should generate a api service with 2 files', async () => {
    await runNgxdCLI(`g s a ${name}`);

    const ts = filesystem.read(`${name}/${name}.api.ts`);
    const spec = filesystem.read(`${name}/${name}.api.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();
    filesystem.remove(`${name}`);
  });

  test('should generate a api service with correct content ', async () => {
    const name = 'fruit';

    await runNgxdCLI(`g s a ${name}`);

    const ts = filesystem.read(`${name}/${name}.api.ts`);
    const spec = filesystem.read(`${name}/${name}.api.spec.ts`);

    expect(ts).toContain(`import { Injectable } from '@angular/core'`);
    expect(ts).toContain(`@Injectable({`);
    expect(ts).toContain(`providedIn: 'root'`);
    expect(ts).toContain(`export class FruitApi {`);

    expect(spec).toContain("describe('FruitApi', () => {");
    expect(spec).toContain("it('should be created', () => {");
    expect(spec).toContain('service = TestBed.inject(FruitApi);');

    filesystem.remove(`${name}`);
  });
});
