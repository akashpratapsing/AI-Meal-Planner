const SuccessStorySection = () => {
  const stories = [
    { title: "Weight Loss Journey", time: "1 month ago" },
    { title: "Muscle Gain", time: "2 months ago" },
    { title: "Fitness Challenge", time: "6 months ago" },
    { title: "Healthy Lifestyle", time: "1 year ago" },
  ];

  return (
    <div className="card bg-white shadow p-4">
      <h3 className="font-medium mb-2">Your success stories</h3>
      <ul className="text-sm space-y-2">
        {stories.map((story) => (
          <li key={story.title} className="flex justify-between">
            {story.title} <span>{story.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SuccessStorySection;
