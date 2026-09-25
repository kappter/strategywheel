let strategyCache = null;

/** Load the strategy catalog once for a browser-based site. */
export async function loadStrategies(url = './strategies.json') {
  if (strategyCache) return strategyCache;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load strategies (${response.status})`);
  strategyCache = await response.json();
  return strategyCache;
}

/** Return all strategies currently loaded. */
export function getStrategies() {
  if (!strategyCache) throw new Error('Call loadStrategies() before selecting a strategy.');
  return strategyCache;
}

/** Return strategies that directly support a requested skill. */
export function getDirectMatches(skill) {
  if (!skill) return getStrategies();
  const target = skill.toLowerCase();
  return getStrategies().filter((strategy) =>
    strategy.skills.some((item) => item.toLowerCase() === target)
  );
}

/**
 * Select a strategy with the original 80% direct-match / 20% stretch logic.
 */
export function getStrategy({ concept, skill, intelligent = true }) {
  const strategies = getStrategies();
  let pool = strategies;
  let matchType = 'stretch';

  if (intelligent && skill) {
    const directMatches = getDirectMatches(skill);
    if (directMatches.length > 0 && Math.random() < 0.8) {
      pool = directMatches;
      matchType = 'direct';
    }
  }

  const strategy = pool[Math.floor(Math.random() * pool.length)];
  return hydrateStrategyTemplates(strategy, concept, skill, matchType);
}

/** Replace placeholders and preserve the selection explanation. */
export function hydrateStrategyTemplates(
  strategy,
  concept = 'this concept',
  skill = 'Apply a concept',
  matchType = 'direct'
) {
  const replace = (text) =>
    text ? text.replace(/\{concept\}/g, concept).replace(/\{skill\}/g, skill) : '';

  return {
    ...strategy,
    matchType,
    setup: replace(strategy.setupTemplate),
    studentMove: replace(strategy.studentMoveTemplate),
    teacherChallenge: replace(strategy.teacherChallengeTemplate),
    prompt: replace(strategy.promptTemplate),
  };
}
