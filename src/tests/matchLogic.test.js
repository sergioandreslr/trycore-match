const { calcularMatch } = require('../matchLogic');

describe('Pruebas de Lógica de Matching (Trycore)', () => {

  test('1. Caso EXCELLENT_FIT', () => {
    const res = calcularMatch(
      { skills: ['java', 'spring'], experiencia_anios: 5 },
      { skills_requeridas: ['java', 'spring'], experiencia_min: 3, tipo_contrato: 'indefinido' }
    );
    expect(res.categoria).toBe('EXCELLENT_FIT');
    expect(res.score).toBeGreaterThanOrEqual(85);
  });

  test('2. Caso GOOD_FIT (ejemplo exacto del PDF)', () => {
    const res = calcularMatch(
      { skills: ['java', 'spring', 'sql'], experiencia_anios: 3 },
      { skills_requeridas: ['java', 'spring', 'kafka', 'sql'], experiencia_min: 5, tipo_contrato: 'indefinido' }
    );
    expect(res.categoria).toBe('GOOD_FIT');
    expect(res.score).toBe(75); // Matemáticamente la fórmula arroja 75
  });

  test('3. Caso MAYBE (puntaje entre 40 y 64)', () => {
    const res = calcularMatch(
      { skills: ['java', 'spring'], experiencia_anios: 3 },
      { skills_requeridas: ['java', 'spring', 'sql', 'docker'], experiencia_min: 4, tipo_contrato: 'obra_labor' }
    );
    expect(res.categoria).toBe('MAYBE');
    expect(res.score).toBeGreaterThanOrEqual(40);
    expect(res.score).toBeLessThan(65);
  });

  test('4. Caso NO_FIT', () => {
    const res = calcularMatch(
      { skills: ['html'], experiencia_anios: 0 },
      { skills_requeridas: ['java', 'spring', 'kafka'], experiencia_min: 5, tipo_contrato: 'prestacion_servicios' }
    );
    expect(res.categoria).toBe('NO_FIT');
    expect(res.score).toBeLessThan(40);
  });

  test('5. Caso borde: skills_requeridas vacía asume 100% cobertura', () => {
    const res = calcularMatch(
      { skills: ['java'], experiencia_anios: 5 },
      { skills_requeridas: [], experiencia_min: 5, tipo_contrato: 'indefinido' }
    );
    expect(res.cobertura_skills).toBe(1);
    expect(res.score).toBe(100);
  });

  test('6. Caso borde: experiencia excedente no genera brecha', () => {
    const res = calcularMatch(
      { skills: ['java'], experiencia_anios: 10 },
      { skills_requeridas: ['java'], experiencia_min: 2, tipo_contrato: 'prestacion_servicios' }
    );
    expect(res.brecha_experiencia).toBe(0);
  });

});