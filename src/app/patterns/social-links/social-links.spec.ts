import { TestBed } from '@angular/core/testing';
import { SocialLinks } from './social-links';

describe('SocialLinks', () => {
  it('lista los 4 accesos con aria-label; el CV es attention y avisa la pestaña nueva', () => {
    const fixture = TestBed.createComponent(SocialLinks);
    fixture.detectChanges();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('ul.g-social li a'),
    );
    expect(links.length).toBe(4);
    expect(links.every((a) => a.getAttribute('aria-label'))).toBe(true);
    const cv = links[3];
    expect(cv.className).toContain('g-icon-button--attention');
    expect(cv.getAttribute('aria-label')).toBe('Ver CV en PDF (abre en una pestaña nueva)');
    expect(cv.getAttribute('target')).toBe('_blank');
    expect(cv.getAttribute('rel')).toBe('noopener');
    expect(links[0].className).toContain('g-icon-button--inverse-raised');
  });
});
