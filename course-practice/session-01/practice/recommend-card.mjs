/**
 * Session 1 teaching exercise, using invented data only.
 * This suggests a card ID; it does not decide the rules or play a move.
 */
export function recommendCard(view) {
  const playableCardIds = new Set(view.legalActions.playableCardIds);
  return view.hand.find((card) => playableCardIds.has(card.id))?.id ?? null;
}
