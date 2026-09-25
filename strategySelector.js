import strategies from './strategies.json';

/**
 * Main Strategy Selector
 * @param {Object} options
 * @param {string} options.concept - Target concept (e.g., "Multidimensional Arrays")
 * @param {string} options.skill - Target skill (e.g., "Apply a concept")
 * @param {boolean} options.intelligent - If true, uses skill-matching logic; if false, selects purely randomly
 * @returns {Object} Strategy object populated with concept/skill values
 */
export function getStrategy({ concept, skill, intelligent = true }) {
  let pool = strategies;

  if (intelligent && skill) {
    // 1. Primary Filter: Find strategies matching the requested target skill directly
    const directMatches = strategies.filter((s) =>
      s.skills.some((sSkill) => sSkill.toLowerCase() === skill.toLowerCase())
    );

    if (directMatches.length > 0) {
      // 80% chance to pick direct match, 20% chance to pick stretch/adjacent strategy
      const useDirectMatch = Math.random() < 0.8;
      pool = useDirectMatch ? directMatches : strategies;
    }
  }

  // Pick a strategy from the chosen pool
  const selectedIndex = Math.floor(Math.random() * pool.length);
  const strategy = pool[selectedIndex];

  // Interpolate templates with user's specific concept and skill
  return hydrateStrategyTemplates(strategy, concept, skill);
}

/**
 * Replaces placeholder strings with actual concept and skill names
 */
function hydrateStrategyTemplates(strategy, concept = "this concept", skill = "Apply a concept") {
  const replacePlaceholders = (text) =>
    text ? text.replace(/\{concept\}/g, concept).replace(/\{skill\}/g, skill) : "";

  return {
    ...strategy,
    setup: replacePlaceholders(strategy.setupTemplate),
    studentMove: replacePlaceholders(strategy.studentMoveTemplate),
    teacherChallenge: replacePlaceholders(strategy.teacherChallengeTemplate),
    prompt: replacePlaceholders(strategy.promptTemplate),
  };
}
