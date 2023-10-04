import { BASE_URL } from "@/helper/Constants";
import { Button, Col, ConfigProvider, Input, Modal, Row } from "antd";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import ApiBase from "./api/Apibase";
import CustomRatingSystem from "./customRating";

export default function FeedbackForm() {
  const [suggestion, setSuggestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [suggestionError, setSuggestionError] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const handleSuggestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSuggestionError(false);
    setSuggestion(e.target.value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackError(false);
    setFeedback(e.target.value);
  };

  const handleRatingChange = (value: number) => {
    setRatingError(false);
    setRating(value);
  };

  const clearFormData = () => {
    setSuggestion("");
    setFeedback("");
    setRating(0);
    setSuggestionError(false);
    setFeedbackError(false);
    setRatingError(false);
  };

  const handleSubmit = () => {
    if (!suggestion) setSuggestionError(true);

    if (!feedback) setFeedbackError(true);

    if (!rating) setRatingError(true);

    if (!suggestion || !feedback || !rating) {
      toast.error("Please fill in all fields.");
      return;
    }

    const data = {
      Suggestion: suggestion,
      Feedback: feedback,
      Rating: rating.toString(),
    };

    ApiBase.post(`${BASE_URL}feedback`, data)
      .then((response) => {
        Modal.success({
          content: "Your feedback has been submitted. Thank You!",
          centered: true,
          onOk: () => clearFormData(),
        });

        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        toast.error("Something went wrong! Please try again");
        console.error(error);
      });
  };
  return (
    <main id="feedback" className="">
      <Row>
        <Col lg={15} md={24} className="feedback-form">
          <h1>Send Us Your Feedback</h1>
          <p className="mt10">
            We aim to help you get the best results when working with Eddgie.
            Please let us know what we can improve.
          </p>

          <div>
            <ConfigProvider
              theme={{ token: { colorBorder: "solid 1px rgba(0, 0, 0, 0.2)" } }}
            >
              <div className="form-group">
                <label>What would you change to improve our App?</label>
                <Input.TextArea
                  value={suggestion}
                  rows={4}
                  status={suggestionError ? "error" : ""}
                  placeholder="Write your answer"
                  onChange={handleSuggestionChange}
                />
              </div>
              <div className="form-group">
                <label>How was your experience with the App?</label>
                <Input.TextArea
                  value={feedback}
                  placeholder="Write your answer"
                  status={feedbackError ? "error" : ""}
                  onChange={handleFeedbackChange}
                />
              </div>
            </ConfigProvider>
            <div>
              <br />
              <label>
                Overall, how would you rate our product?
                <br />
                <small>
                  &apos;1&apos; Being the worst and &apos;10&apos; being the
                  best
                </small>
              </label>
              <CustomRatingSystem
                rating={rating}
                error={ratingError}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <div className="btn-rows">
              <Button onClick={() => clearFormData()}>Cancel</Button>
              <Button onClick={handleSubmit}>Send</Button>
            </div>
          </div>
        </Col>
        <Col xs={0} lg={9} xl={9} style={{ height: "80%" }}>
          <Image
            src="/images/Mask group.jpg"
            width={600}
            height={800}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </main>
  );
}
