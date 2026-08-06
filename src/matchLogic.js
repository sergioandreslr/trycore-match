function calcularMatch(candidato, vacante) {
  const skillsCandidato = new Set(candidato.skills || []);
  const reqSkills = vacante.skills_requeridas || [];


  const skillsEnComun = reqSkills.filter(skill => skillsCandidato.has(skill));
  const cobertura_skills = reqSkills.length > 0 ? skillsEnComun.length / reqSkills.length : 1;

  const brecha_experiencia = Math.max(0, (vacante.experiencia_min || 0) - (candidato.experiencia_anios || 0));

  let bonus_contrato = 0;
  if (vacante.tipo_contrato === "indefinido") bonus_contrato = 10;
  else if (vacante.tipo_contrato === "obra_labor") bonus_contrato = 5; 

  const score = Math.round(
    cobertura_skills * 70 +
    Math.max(0, 1 - brecha_experiencia / 5) * 20 + 
    bonus_contrato
  );

  let categoria = "NO_FIT";
  if (score >= 85) categoria = "EXCELLENT_FIT";
  else if (score >= 65) categoria = "GOOD_FIT";
  else if (score >= 40) categoria = "MAYBE";

  const razones = [];
  if (reqSkills.length > 0) {
    razones.push(`Cobertura de skills ${skillsEnComun.length}/${reqSkills.length} (${Math.round(cobertura_skills * 100)}%)`);
  } else {
    razones.push("Vacante sin skills requeridas especificadas (100% cobertura por defecto)");
  }

  if (brecha_experiencia > 0) {
    razones.push(`Brecha de experiencia: ${brecha_experiencia} años (penalización aplicada)`);
  }
  if (bonus_contrato > 0) {
    razones.push(`Contrato ${vacante.tipo_contrato} suma ${bonus_contrato} puntos`);
  }

  return {
    score,
    categoria,
    cobertura_skills,
    brecha_experiencia,
    razones
  };
}

module.exports = { calcularMatch };