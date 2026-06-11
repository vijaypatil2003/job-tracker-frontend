import API from "./axios";

export const extractJobDetails = async (jobDescription) => {
  const response = await API.post(
    "/ai/extract",
    new URLSearchParams({ jobDescription }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  return response.data;
};

export const getFitScore = async (jobId) => {
  const response = await API.post("/ai/fit-score", { jobId });
  return response.data;
};
