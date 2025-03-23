import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan, PlanData, PlanState, PlanType } from "../types";

const initialState: PlanState = {
  plan: [],
  planInfo: [],
  selectedPlan: "1_year",
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<PlanData>) => {
      const { plansInfo, plans, features } = action.payload;

      // Convert plansInfo object into an array
      const planInfo = Object.entries(plansInfo).map(([type, details]) => ({
        type: type as PlanType,
        ...details,
      }));

      // Process plans and organize them into structured data
      const formattedPlans = plans.reduce((acc: Plan[], plan, index) => {
        const id = index + 1;
        const cleanTitle = plan.title.replace(/<\/?strong>/g, "");
        const isFreePlan =
          plan.details["1_year"].price === "Free" ||
          plan.details["2_year"].price === "Free"
            ? 0
            : 1;

        // Check if plan already exists
        const existingPlan = acc.find((item) => item.name === plan.name);

        if (existingPlan) {
          // Add new plan option if plan already exists
          existingPlan.planOptions.push({
            ...plan,
            id,
            title: cleanTitle,
            planOptions: [],
            features: [],
          });
        } else {
          // Determine features based on plan price
          const filteredFeatures = features
            .map((feature) => ({
              ...feature,
              is_pro: Number(feature.is_pro),
            }))
            .filter((feature) => feature.is_pro === isFreePlan);

          // Create a new plan entry
          acc.push({
            ...plan,
            id,
            is_pro: isFreePlan,
            planOptions: [
              {
                ...plan,
                id,
                title: cleanTitle,
                planOptions: [],
                features: [],
              },
            ],
            features: filteredFeatures,
          });
        }

        return acc;
      }, []);

      // Update state
      state.planInfo = planInfo;
      state.plan = formattedPlans;
      state.selectedPlan = planInfo[0]?.type;
    },

    setSelectedPlan: (state, action: PayloadAction<PlanType>) => {
      state.selectedPlan = action.payload;
    },
    handlePlanOption: (
      state,
      action: PayloadAction<{
        planId: string | number;
        planOptionId: string | number;
      }>
    ) => {
      const { planId, planOptionId } = action.payload;

      const selectedPlan = state.plan.find((plan) => plan.id === planId);
      if (!selectedPlan) return;

      const selectedOption = selectedPlan.planOptions.find(
        (option) => option.id === planOptionId
      );
      if (!selectedOption) return;

      state.plan = state.plan.map((plan) =>
        plan.id === planId ? { ...plan, details: selectedOption.details } : plan
      );
    },
  },
});

export const { setPlan, setSelectedPlan, handlePlanOption } = planSlice.actions;

export default planSlice.reducer;
