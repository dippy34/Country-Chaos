import { describe, expect, it } from 'vitest';
import { blackbody } from '../src/render/blackbody';

describe('blackbody photometry', () => {
  it('a 5772 K blackbody has roughly solar surface luminance', () => {
    const { L, rgb } = blackbody(5772);
    expect(L).toBeGreaterThan(1.6e9);
    expect(L).toBeLessThan(2.4e9);
    // close to white, slightly warm
    expect(rgb[0]).toBeGreaterThan(rgb[2]);
  });
  it('hot sources are blue, cool sources red, and luminance rises with T', () => {
    expect(blackbody(30000).rgb[2]).toBeGreaterThan(blackbody(30000).rgb[0]);
    expect(blackbody(3000).rgb[0]).toBeGreaterThan(blackbody(3000).rgb[2]);
    expect(blackbody(1e7).L).toBeGreaterThan(blackbody(1e5).L);
  });
});
