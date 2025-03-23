import { handlePlanOption } from "../features/planSlice";
import { useAppDispatch, useAppSelector } from "../store/reduxStore";
import PlanCard from "./PlanCard";
import styled from "@emotion/styled";

const PlanList = () => {
  const { plan, selectedPlan } = useAppSelector((state) => state.plan);
  const dispatch = useAppDispatch();
  const colors = ["#4CB3FD", "#FFB72C", "#68CB9B", "#B78DEB"];

  return (
    <GridContainer>
      {plan.map((item, i) => (
        <PlanCard
          key={i}
          price={item.details[selectedPlan].price}
          isPopular={i === 2}
          priceLabel={item.details[selectedPlan].price_postfix}
          plan={item}
          discountLabel={
            item.is_pro && selectedPlan === "2_year" ? (
              <small style={{ color: "red" }}>
                <s>{item.details["1_year"].price}</s>
              </small>
            ) : null
          }
          handlePlanOption={(value) => {
            dispatch(
              handlePlanOption({
                planId: item.id,
                planOptionId: Number(value.value),
              })
            );
          }}
          color={colors[i]}
        />
      ))}
    </GridContainer>
  );
};

export default PlanList;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
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
