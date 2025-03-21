import { handlePlanOption } from "../features/planSlice";
import { useAppDispatch, useAppSelector } from "../store/reduxStore";
import PlanCard from "./PlanCard";
import styled from "@emotion/styled";

const PlanList = () => {
  const { plan, selectedPlan } = useAppSelector((state) => state.plan);
  const dispatch = useAppDispatch();

  return (
    <GridContainer>
      {plan.map((item, i) => (
        <PlanCard
          key={i}
          price={item.details[selectedPlan].price}
          isPopular={i === 0}
          priceLabel={item.details[selectedPlan].price_postfix}
          plan={item}
          discountAmount={
            selectedPlan === "2_year"
              ? `${item.details["1_year"].price}${item.details[selectedPlan].price_postfix}`
              : ""
          }
          handlePlanOption={(value) => {
            dispatch(
              handlePlanOption({
                planId: item.id,
                planOptionId: Number(value.value),
              })
            );
          }}
        />
      ))}
    </GridContainer>
  );
};

export default PlanList;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
