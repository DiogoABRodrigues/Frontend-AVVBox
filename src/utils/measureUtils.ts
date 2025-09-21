/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatMeasurements = (current: any, last: any, goal: any) => {
  const labels = {
    weight: "Peso",
    height: "Altura",
    bodyFat: "Gordura corporal",
    muscleMass: "Massa muscular",
    visceralFat: "Gordura visceral",
  };

  const units: Record<string, string> = {
    weight: "kg",
    height: "cm",
    bodyFat: "%",
    muscleMass: "%",
    visceralFat: "%",
  };

  return Object.keys(labels).map((key) => {
    const currentValue = current?.[key] ?? null;
    const lastValue = last?.[key] ?? null;
    const goalValue = goal?.[key] ?? null;

    let delta = 0;
    let color: "green" | "red" | "gray" | "gold" = "gray";
    let arrow: "up" | "down" | "none" = "none";
    let reachedGoal = false;

    if (currentValue !== null && lastValue !== null) {
      delta = currentValue - lastValue;

      // Determina direção desejada
      const wantsIncrease = goalValue !== null && goalValue > lastValue;
      const wantsDecrease = goalValue !== null && goalValue < lastValue;

      // Verifica se atingiu o objetivo (estrela, exceto altura)
      if (key !== "height" && goalValue !== null) {
        const reached =
          (wantsDecrease && currentValue <= goalValue) ||
          (wantsIncrease && currentValue >= goalValue) ||
          (goalValue === lastValue && currentValue === goalValue);
        if (reached) {
          reachedGoal = true;
          color = "gold";
          arrow = "none";
        }
      }

      // Se ainda não atingiu o goal, determina seta e cor
      if (!reachedGoal) {
        if (delta > 0) arrow = "up";
        else if (delta < 0) arrow = "down";
        else arrow = "none";

        // Cor depende se o delta vai na direção do goal
        if (delta === 0) {
          color = "gray";
        } else if (
          (delta > 0 && wantsIncrease) ||
          (delta < 0 && wantsDecrease)
        ) {
          color = "green"; // mudou na direção certa
        } else {
          color = "red"; // mudou contra a direção
        }
      }
    }

    // Arredonda valores para 1 casa decimal quando não null
    const round = (v: number | null) =>
      v !== null ? Number(v.toFixed(1)) : null;

    // Formata deltaLabel
    let deltaLabel = "";
    const roundedDelta = round(delta);
    if (reachedGoal && key !== "height") {
      deltaLabel = "✨";
    } else if (delta === 0) {
      deltaLabel = "—";
    } else {
      const sign = roundedDelta! > 0 ? "+" : "";
      deltaLabel = `${arrow === "up" ? "↑" : arrow === "down" ? "↓" : "—"} ${sign}${roundedDelta}${units[key]}`;
    }

    return {
      label: labels[key as keyof typeof labels],
      current: round(currentValue),
      last: round(lastValue),
      goal: round(goalValue),
      delta: roundedDelta,
      color,
      arrow,
      reachedGoal,
      deltaLabel,
    };
  });
};
