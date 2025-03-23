import styled from "@emotion/styled";
import CustomSelect from "./CustomSelect";
import React, { useState } from "react";
import { Plan } from "../types";
import Tooltip from "./ui/Tooltip";
import { BiInfoCircle } from "react-icons/bi";
interface Option {
  value: string;
  label: string;
}

interface PlanCardProps {
  price: string;
  priceLabel: string;
  isPopular?: boolean;
  plan: Plan;
  discountLabel?: React.ReactNode;
  handlePlanOption: (value: Option) => void;
  color: string;
}

const PlanCard = ({
  price,
  priceLabel,
  isPopular = false,
  discountLabel,
  plan,
  handlePlanOption,
  color,
}: PlanCardProps) => {
  const [visitor, setVisitor] = useState<Option | null>({
    label: plan.planOptions[0].title,
    value: plan.planOptions[0].id.toString(),
  });

  return (
    <Card>
      {isPopular && <Badge color={color}>Most Popular</Badge>}
      <Header color={color} />
      <Content>
        <PlanTitle>{plan.name}</PlanTitle>
        <PlanPriceWrapper>
          <PlanPrice color={color}>{price}</PlanPrice>
          <PriceLabel>
            {discountLabel && discountLabel}
            <p>{priceLabel}</p>
          </PriceLabel>
        </PlanPriceWrapper>

        <div style={{ marginBottom: "12px", marginTop: "12px" }}>
          {plan.planOptions.length > 1 ? (
            <PlanSelectWrapper>
              <CustomSelect
                onChange={(value) => {
                  setVisitor(value);
                  handlePlanOption(value);
                }}
                options={[
                  ...plan.planOptions.map((item) => ({
                    label: item.title,
                    value: item.id.toString(),
                  })),
                ]}
                value={visitor}
                placeholder="Select a plan"
                color={color}
              />
              <Tooltip text={plan.text}>
                <BiInfoCircle style={{ color: color }} />
              </Tooltip>
            </PlanSelectWrapper>
          ) : (
            <VisitorLimit color={color}>
              <div dangerouslySetInnerHTML={{ __html: plan.title }}></div>
              <Tooltip text={plan.text}>
                <BiInfoCircle />
              </Tooltip>
            </VisitorLimit>
          )}
        </div>

        <FeatureList>
          <FeatureTitle>
            {plan.is_pro === 1 ? "Everything in free plus:" : "Free includes:"}
          </FeatureTitle>
          {plan.features.map((feature, index) => (
            <FeatureItem key={index}>
              <Tooltip text={feature.feature_desc}>
                {feature.feature_title}
              </Tooltip>
            </FeatureItem>
          ))}
        </FeatureList>
        <SelectButton color={color}>Select Plan</SelectButton>
      </Content>
    </Card>
  );
};

export default PlanCard;

const Card = styled.div`
  background: #f7fcf9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Inter", sans-serif;
  position: relative;
`;

const Header = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  height: 6px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Badge = styled.div<{ color: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ color }) => color};
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PlanTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  text-align: start;
`;

const PlanPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
`;

const PlanPrice = styled.div<{ color: string }>`
  font-size: 32px;
  color: ${({ color }) => color};
`;

const PriceLabel = styled.p`
  font-size: 14px;
  /* color: #555; */
  text-align: start;
`;

const VisitorLimit = styled.div<{ color: string }>`
  position: relative;
  background: ${({ color }) => `${color}1A`};
  padding: 5px 15px;
  border-radius: 32px;
  color: ${({ color }) => color};
  display: flex;
  text-align: center;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: start;
`;

const FeatureTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const FeatureItem = styled.li``;

const SelectButton = styled.button<{ color: string }>`
  background: ${({ color }) => color};
  color: white;
  font-weight: bold;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
  &:hover {
    filter: brightness(90%);
  }
`;

const PlanSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
