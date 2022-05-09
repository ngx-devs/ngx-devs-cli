import { SamplePipe } from './sample.pipe';

fdescribe("SamplePipe", () => {
  it("create an instance", () => {
    const pipe = new SamplePipe();
    expect(pipe).toBeTruthy();
  });
});
