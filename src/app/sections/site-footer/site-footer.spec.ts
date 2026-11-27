import { TestBed } from '@angular/core/testing';
import { DEFAULT_SOCIAL_LINKS } from '../../patterns';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('footer con créditos y redes con nombre accesible', () => {
    const fixture = TestBed.createComponent(SiteFooter);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('footer')).not.toBeNull();
    expect(el.textContent).toContain('Stefania Holguin Quiroz');
    const social = el.querySelectorAll('.g-social a');
    expect(social.length).toBe(DEFAULT_SOCIAL_LINKS.length);
    social.forEach((a) => expect(a.getAttribute('aria-label')).toBeTruthy());
  });
});
