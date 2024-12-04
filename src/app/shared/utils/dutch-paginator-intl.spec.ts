import { getDutchPaginatorIntl } from './dutch-paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';

describe('getDutchPaginatorIntl', () => {
  let paginatorIntl: MatPaginatorIntl;

  beforeEach(() => {
    paginatorIntl = getDutchPaginatorIntl();
  });

  it('should set itemsPerPageLabel correctly', () => {
    expect(paginatorIntl.itemsPerPageLabel).toBe('Registers for page:');
  });

  it('should set nextPageLabel correctly', () => {
    expect(paginatorIntl.nextPageLabel).toBe('Siguiente');
  });

  it('should set previousPageLabel correctly', () => {
    expect(paginatorIntl.previousPageLabel).toBe('Atrás');
  });

  it('should set firstPageLabel correctly', () => {
    expect(paginatorIntl.firstPageLabel).toBe('Primera página');
  });

  it('should set lastPageLabel correctly', () => {
    expect(paginatorIntl.lastPageLabel).toBe('Última página');
  });

  it('should define getRangeLabel function', () => {
    expect(typeof paginatorIntl.getRangeLabel).toBe('function');
  });

  it('should return correct range label', () => {
    const result = paginatorIntl.getRangeLabel(2, 10, 100);
    expect(result).toBe('21 - 30 de 100');
  });

  it('should handle zero length and pageSize correctly in range label', () => {
    const result = paginatorIntl.getRangeLabel(0, 0, 0);
    expect(result).toBe('0 de 0');
  });

  it('should handle negative lengths correctly', () => {
    const result = paginatorIntl.getRangeLabel(2, 10, -5);
    expect(result).toBe('21 - 30 de 0');
  });

  it('should handle end index exceeding length correctly', () => {
    const result = paginatorIntl.getRangeLabel(20, 10, 150);
    expect(result).toBe('201 - 210 de 150');
  });
});
