import { filesystem } from 'gluegun';

import { runNgxdCLI } from '../../../../utils/cli-test-setup';
import { getLineNumber } from '../../../../utils/functions.test.helper';

describe('Commands: [Generate] => [Store] => [NgSimpleState]', () => {
  const TESTING_DIR = '__SST_TEST__';
  const COMMAND = 'g st sst';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterAll(() => {
    jest.clearAllTimers();
    filesystem.remove(TESTING_DIR);
  });

  test('should generate a ng-simple-state store with 2 files', async () => {
    const name = 'base-fruit';
    await runNgxdCLI(`${COMMAND} ${name}`);

    const ts = filesystem.read(`${name}/${name}.store.ts`);
    const spec = filesystem.read(`${name}/${name}.store.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();

    filesystem.remove(name);
  });

  test('should generate a ng-simple-state store at given path', async () => {
    const path = `${TESTING_DIR}/store`;
    const name = 'fruit1';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.store.ts`);
    const spec = filesystem.read(`${path}/${name}/${name}.store.spec.ts`);

    expect(ts).toBeDefined();
    expect(spec).toBeDefined();
  });

  test('should generate a ng-simple-state store.ts file with correct content', async () => {
    const path = `${TESTING_DIR}/store`;
    const name = 'fruit2';

    await runNgxdCLI(`${COMMAND} ${name} --path ${path}`);

    const ts = filesystem.read(`${path}/${name}/${name}.store.ts`);

    const lines = ts.split(/\r?\n/);

    expect(getLineNumber(lines, 1)).toContain(`import { Injectable, Injector } from '@angular/core'`);

    expect(getLineNumber(lines, 3)).toContain(`import { NgSimpleStateBaseStore } from 'ng-simple-state'`);
    expect(getLineNumber(lines, 4)).toContain(`import { Observable, switchMap, tap } from 'rxjs'`);

    expect(getLineNumber(lines, 6)).toContain(`export interface Fruit2State {`);
    expect(getLineNumber(lines, 7)).toContain(`fruit2s: Fruit2Response[];`);
    expect(getLineNumber(lines, 8)).toContain(`}`);

    expect(getLineNumber(lines, 10)).toContain(`export const FRUIT2_INITIAL_STATE: Fruit2State = {`);
    expect(getLineNumber(lines, 11)).toContain(`fruit2s: [],`);
    expect(getLineNumber(lines, 12)).toContain(`}`);

    expect(getLineNumber(lines, 14)).toContain(`@Injectable()`);
    expect(getLineNumber(lines, 15)).toContain(
      `export class Fruit2Store extends NgSimpleStateBaseStore<Fruit2State> {`
    );
    expect(getLineNumber(lines, 16)).toContain('constructor(');
    expect(getLineNumber(lines, 17)).toContain('injector: Injector,');
    expect(getLineNumber(lines, 18)).toContain('private readonly fruit2ApiService: Fruit2ApiService');
    expect(getLineNumber(lines, 19)).toContain(') {');
    expect(getLineNumber(lines, 20)).toContain('super(injector);');
    expect(getLineNumber(lines, 21)).toContain('}');

    expect(getLineNumber(lines, 23)).toContain('initialState(): Fruit2State {');
    expect(getLineNumber(lines, 24)).toContain('return FRUIT2_INITIAL_STATE;');
    expect(getLineNumber(lines, 25)).toContain('}');

    expect(getLineNumber(lines, 27)).toContain('create(fruit2Request: Fruit2Request): Observable<Fruit2Response> {');
    expect(getLineNumber(lines, 28)).toContain('return this.fruit2ApiService.create(fruit2Request).pipe(');
    expect(getLineNumber(lines, 29)).toContain('tap((fruit2) => {');
    expect(getLineNumber(lines, 30)).toContain(
      'this.setState((state) => ({ ...state, fruit2s: [...state.fruit2s, fruit2] }));'
    );
    expect(getLineNumber(lines, 31)).toContain('})');
    expect(getLineNumber(lines, 32)).toContain(');');
    expect(getLineNumber(lines, 33)).toContain('}');

    expect(getLineNumber(lines, 35)).toContain('update(fruit2ID: number, fruit2Request: Fruit2Request) {');
    expect(getLineNumber(lines, 36)).toContain('return this.fruit2ApiService.update(fruit2ID, fruit2Request).pipe(');
    expect(getLineNumber(lines, 37)).toContain('tap((fruit2) => {');
    expect(getLineNumber(lines, 38)).toContain('this.setState((state) => {');
    expect(getLineNumber(lines, 39)).toContain(
      'const targetFruit2Index = state.fruit2s.findIndex((item) => item.fruit2ID === fruit2ID);'
    );
    expect(getLineNumber(lines, 40)).toContain('const fruit2s = [...state.fruit2s];');
    expect(getLineNumber(lines, 41)).toContain('fruit2s[targetFruit2Index] = fruit2;');
    expect(getLineNumber(lines, 42)).toContain('return { ...state, fruit2s };');
    expect(getLineNumber(lines, 43)).toContain('});');
    expect(getLineNumber(lines, 44)).toContain('})');
    expect(getLineNumber(lines, 45)).toContain(');');
    expect(getLineNumber(lines, 46)).toContain('}');

    expect(getLineNumber(lines, 48)).toContain('remove(fruit2ID: number) {');
    expect(getLineNumber(lines, 49)).toContain('return this.fruit2ApiService.remove(fruit2ID).pipe(');
    expect(getLineNumber(lines, 50)).toContain('tap(() => {');
    expect(getLineNumber(lines, 51)).toContain('this.setState((state) => ({');
    expect(getLineNumber(lines, 52)).toContain(
      'fruit2s: state.fruit2s.filter((fruit2) => fruit2.fruit2ID !== fruit2ID),'
    );
    expect(getLineNumber(lines, 53)).toContain('}));');
    expect(getLineNumber(lines, 54)).toContain('})');
    expect(getLineNumber(lines, 55)).toContain(');');
    expect(getLineNumber(lines, 56)).toContain('}');

    expect(getLineNumber(lines, 58)).toContain('findAll(fruit2ID: number): Observable<Fruit2Response[]> {');
    expect(getLineNumber(lines, 59)).toContain('return this.fruit2ApiService.findAll(+ministryID).pipe(');
    expect(getLineNumber(lines, 60)).toContain('tap((fruit2s) => {');
    expect(getLineNumber(lines, 61)).toContain('this.setState((state) => ({ ...state, fruit2s }));');
    expect(getLineNumber(lines, 62)).toContain('})');
    expect(getLineNumber(lines, 63)).toContain('switchMap(() => this.selectState((state) => state.fruit2s))');
    expect(getLineNumber(lines, 64)).toContain(');');
    expect(getLineNumber(lines, 65)).toContain('}');

    expect(getLineNumber(lines, 67)).toContain('findByID(fruit2ID: number): Observable<Fruit2Response> {');
    expect(getLineNumber(lines, 68)).toContain('return this.fruit2ApiService.findByID(fruit2ID);');
    expect(getLineNumber(lines, 69)).toContain('}');
    expect(getLineNumber(lines, 70)).toContain('}');

    expect(lines.length).toBe(71);

    filesystem.remove(`${name}`);
  });
});
