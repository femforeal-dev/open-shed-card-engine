// Intentional separate learner bug. The supplied adapter does not use this.
// Input is untrusted JSON text; return true only for the exact scenario contract.
import {coachScenario} from '../src/scenarios.mjs';

const answerFields=['kind','ruleId','cardId','explanation'];
const isRecord=value=>!!value&&typeof value==='object'&&!Array.isArray(value);

export function acceptAnswer(text,scenarioId){
  const scenario=coachScenario(scenarioId);
  if(!scenario||typeof text!=='string')return false;

  let answer;
  try{answer=JSON.parse(text);}catch{return false;}
  if(!isRecord(answer))return false;

  const keys=Object.keys(answer);
  if(keys.length!==answerFields.length||answerFields.some(field=>!Object.hasOwn(answer,field)))return false;

  const permittedCardId=scenario.kind==='suggest'?'practice-red-3':null;
  return answer.kind===scenario.kind&&answer.ruleId===scenario.rule&&answer.cardId===permittedCardId&&
    typeof answer.explanation==='string'&&answer.explanation.length>=10&&answer.explanation.length<=1200;
}
