import type { FarmerData, RecommendedScheme, Scheme, Reason } from '../types';
import { schemes as allSchemes } from '../data/schemes';

export const recommendSchemes = (farmerData: FarmerData): RecommendedScheme[] => {
  const scoredSchemes = allSchemes.map((scheme: Scheme) => {
    let score = 0;
    const reasons: Reason[] = [];
    
    // Re-balanced points to prioritize specific matches. Max score is 100.
    const pointsBreakdown = {
        state: 35,
        crop: 30,
        land: 20,
        income: 10,
        irrigation: 5,
    };

    // 1. State check (hard filter)
    if (scheme.states_allowed.includes("ALL") || scheme.states_allowed.includes(farmerData.state)) {
      score += pointsBreakdown.state;
      reasons.push({ key: 'reason_state_match', values: { state: farmerData.state } });
    } else {
      return null; // Not eligible at all if state doesn't match
    }

    // 2. Land size check
    const { landSize } = farmerData;
    const { min_land_acres, max_land_acres } = scheme;
    const landSizeTolerance = 0.2; // 20% tolerance

    if (landSize >= min_land_acres && landSize <= max_land_acres) {
      score += pointsBreakdown.land;
      reasons.push({ key: 'reason_land_match', values: { landSize } });
    } else if (landSize >= min_land_acres * (1 - landSizeTolerance) && landSize < min_land_acres) {
      score += pointsBreakdown.land * 0.5;
      reasons.push({ key: 'reason_land_slightly_low' });
    } else if (landSize > max_land_acres && landSize <= max_land_acres * (1 + landSizeTolerance)) {
      score += pointsBreakdown.land * 0.5;
      reasons.push({ key: 'reason_land_slightly_high' });
    }

    // 3. Crop check - CRITICAL REVISED LOGIC
    if (Array.isArray(scheme.crops_allowed) && scheme.crops_allowed.includes(farmerData.crop)) {
      // Perfect match for a specific crop gets full points
      score += pointsBreakdown.crop;
      reasons.push({ key: 'reason_crop_match', values: { crop: farmerData.crop } });
    } else if (scheme.crops_allowed === "ALL") {
      // General 'ALL' scheme is valuable but less so than a specific match
      score += pointsBreakdown.crop * 0.6; // 60% of crop points
      reasons.push({ key: 'reason_crop_no_specific_match', values: { crop: farmerData.crop } });
    }
    // If it's an array and doesn't match, it gets 0 points for crop, correctly lowering its rank.
    
    // 4. Annual Income check
    const { annualIncome } = farmerData;
    if (scheme.income_limit) {
        if (annualIncome <= scheme.income_limit) {
            score += pointsBreakdown.income;
            reasons.push({ key: 'reason_income_match' });
        } else if (annualIncome <= scheme.income_limit * 1.2) { // 20% tolerance
            score += pointsBreakdown.income * 0.5;
            reasons.push({ key: 'reason_income_slightly_high' });
        }
    } else {
        // No income limit, small bonus for broad applicability.
        score += pointsBreakdown.income * 0.3;
        reasons.push({ key: 'reason_income_no_limit' });
    }

    // 5. Irrigation Type check (Bonus points)
    const { irrigationType } = farmerData;
    if (scheme.irrigation_bonus && scheme.irrigation_bonus.includes(irrigationType)) {
        score += pointsBreakdown.irrigation;
        reasons.push({ key: 'reason_irrigation_bonus', values: { irrigationType } });
    }

    // Final score is already out of 100
    const finalScore = Math.min(100, Math.round(score));

    if (finalScore < 20) return null; // Filter out very low-scoring schemes

    return { ...scheme, score: finalScore, reasons };
  }).filter((s): s is RecommendedScheme => s !== null);

  // Sort by score and return top 5
  return scoredSchemes.sort((a, b) => b.score - a.score).slice(0, 5);
};