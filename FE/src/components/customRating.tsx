import { Button, Row } from "antd";

interface CustomRatingSystemProps {
  rating: number;
  error: boolean;
  handleRatingChange: (value: number) => void;
}

const CustomRatingSystem = ({
  rating,
  error,
  handleRatingChange,
}: CustomRatingSystemProps) => {
  return (
    <>
      <Row style={{ padding: "2rem" }}>
        {[...Array(10)].map((_, index) => {
          const ratingValue = index + 1;
          const isSelected = ratingValue <= rating;
          const key = `rating-${index + ratingValue}`;

          return (
            <Button
              key={key}
              type={isSelected ? "primary" : "default"}
              style={{
                width: "51px",
                height: "51px",
                border: `solid 1px ${error ? "#ff4d4f" : "#c7c7c7"}`,
                fontWeight: isSelected ? "bold" : "normal",
                borderRadius: 0,
              }}
              onClick={() => handleRatingChange(ratingValue)}
            >
              {ratingValue}
            </Button>
          );
        })}
      </Row>
    </>
  );
};

export default CustomRatingSystem;
