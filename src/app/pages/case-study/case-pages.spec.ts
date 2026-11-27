import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { AviancaCase } from './avianca/avianca-case';
import { NovasecCase } from './novasec/novasec-case';
import { VeyraCase } from './veyra/veyra-case';

const cases: [string, Type<unknown>, string | null][] = [
  ['novasec', NovasecCase, 'veyra'],
  ['veyra', VeyraCase, 'avianca'],
  ['avianca', AviancaCase, null],
];

describe('Casos de estudio', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  for (const [slug, cmp, next] of cases) {
    describe(slug, () => {
      it('una h1, un main y el tema del caso', () => {
        const fixture = TestBed.createComponent(cmp);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        expect(el.querySelectorAll('h1').length).toBe(1);
        expect(el.querySelectorAll('main').length).toBe(1);
        expect(el.querySelector('g-case-shell')?.getAttribute('data-case')).toBe(slug);
      });

      it('imágenes con alt y enlaces externos seguros', () => {
        const fixture = TestBed.createComponent(cmp);
        fixture.detectChanges();
        const el = fixture.nativeElement as HTMLElement;
        el.querySelectorAll('img').forEach((img) => expect(img.hasAttribute('alt')).toBe(true));
        el.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((a) =>
          expect(a.rel).toContain('noopener'),
        );
      });

      it(next ? `tarjeta siguiente hacia ${next}` : 'sin tarjeta siguiente', () => {
        const fixture = TestBed.createComponent(cmp);
        fixture.detectChanges();
        const card = (fixture.nativeElement as HTMLElement).querySelector('a.g-case-next');
        expect(card?.getAttribute('data-case') ?? null).toBe(next);
      });

      it('publica una meta descripción propia', () => {
        TestBed.createComponent(cmp);
        expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain(
          slug.charAt(0).toUpperCase() + slug.slice(1),
        );
      });
    });
  }
});
