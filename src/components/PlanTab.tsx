import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../store/reduxStore";
import { setSelectedPlan } from "../features/planSlice";

const PlanTab = () => {
  const { planInfo, selectedPlan } = useAppSelector((state) => state.plan);
  const dispatch = useAppDispatch();

  return (
    <TabContainer>
      {planInfo.map((item, index) => (
        <ButtonContainer>
          <PlanButton
            key={item.type}
            selected={selectedPlan === item.type}
            onClick={() => dispatch(setSelectedPlan(item.type))}
          >
            {item.title}
          </PlanButton>

          {index === 0 && <Divider />}
          {item.discount && <DiscountBadge>{item.discount}</DiscountBadge>}
        </ButtonContainer>
      ))}
    </TabContainer>
  );
};

export default PlanTab;

// Styled Components
const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  justify-content: center;
`;

const PlanButton = styled.button<{ selected: boolean }>`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  color: ${({ selected }) => (selected ? "#8A4FFF" : "#333")};
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #8a4fff;
  }

  ${({ selected }) =>
    selected &&
    `
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: #8A4FFF;
    }
  `}
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: #ddd;
`;

const DiscountBadge = styled.span`
  background: rgba(138, 79, 255, 0.1);
  color: #8a4fff;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;
