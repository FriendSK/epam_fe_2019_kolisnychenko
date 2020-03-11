import { DurationConvertPipe } from './duration-convert.pipe';

fdescribe('DurationConvertPipe', () => {

  let pipe;

  beforeEach(() => {
    pipe = new DurationConvertPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('should convert time format', () => {
      const result = pipe.transform(110);
      expect(result).toBe('1h 50min');
    });
  });
});
