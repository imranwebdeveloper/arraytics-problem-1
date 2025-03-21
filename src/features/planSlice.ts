import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import plan from "../assets/plan.json";

type PlanType = keyof typeof plan.plansInfo;
export type PlanData = typeof plan;

interface PlanDetails {
  price: string;
  price_postfix: string;
  plan_type: string;
  plan_info: string;
  dd_text: string;
  btn_text: string;
  price_id: string;
}

export interface Plan {
  name: string;
  price: string;
  title: string;
  text: string;
  id: string | number;
  details: {
    [key: string]: PlanDetails;
  };
  planOptions: Plan[];
  features: Feature[];
}

interface PlanInfo {
  title: string;
  sub_title: string;
  discount: string;
  type: PlanType;
}

export interface Feature {
  is_pro: string;
  feature_title: string;
  feature_desc: string;
}

export interface planState {
  plan: Plan[];
  planInfo: PlanInfo[];
  selectedPlan: PlanType;
}

const initialState: planState = {
  plan: [],
  planInfo: [],
  selectedPlan: "1_year",
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<typeof plan>) => {
      const data = action.payload;

      const planInfo = Object.entries(data.plansInfo).map(([key, value]) => ({
        type: key as PlanType,
        ...value,
      }));

      const plans = data.plans.reduce((acc: Plan[], plan, i) => {
        const id = i + 1;
        const cleanTitle = plan.title.replace(/<\/?strong>/g, "");
        const isExitPlan = acc.find((item) => item.name === plan.name);

        if (isExitPlan) {
          isExitPlan.planOptions.push({
            ...plan,
            id,
            title: cleanTitle,
            planOptions: [],
            features: [],
          });
        } else {
          let features = [] as Feature[];
          if (plan.price.toLowerCase() === "free") {
            features = data.features.filter((item) => item.is_pro === "0");
          } else {
            features = data.features.filter((item) => item.is_pro === "1");
          }

          acc.push({
            ...plan,
            id,
            planOptions: [
              {
                ...plan,
                title: cleanTitle,
                features: [],
                planOptions: [],
                id,
              },
            ],
            features,
          });
        }
        return acc;
      }, []);

      state.planInfo = planInfo;
      state.plan = plans;
      state.selectedPlan = planInfo[0].type;
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
