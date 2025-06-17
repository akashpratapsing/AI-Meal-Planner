import React from "react";

const stories = [
  {
    title: "Weight Loss Journey",
    time: "1 month ago",
    icon: "⭐", // or use Heroicons/SVG
  },
  {
    title: "Muscle Gain",
    time: "2 months ago",
    icon: "😊",
  },
  {
    title: "Fitness Challenge",
    time: "6 months ago",
    icon: "🏆",
  },
  {
    title: "Healthy Lifestyle",
    time: "1 year ago",
    icon: "👍",
  },
];

const SuccessStorySection = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-auto">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Your success stories</h3>
      <div className="space-y-3">
        {stories.map((story, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-lg px-2 py-2 hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 rounded-full p-2 text-xl">{story.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-800">{story.title}</p>
                <p className="text-xs text-gray-500">{story.time}</p>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStorySection;
