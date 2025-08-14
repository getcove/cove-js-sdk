import { describe, expect, it } from 'vitest';
import { CoveEmbed } from './CoveEmbed';

describe('CoveEmbed', () => {
  it('exports CoveEmbed component', () => {
    expect(CoveEmbed).toBeDefined();
    expect(typeof CoveEmbed).toBe('function');
  });
});
