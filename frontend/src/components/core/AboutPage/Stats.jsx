const stats = [
  { count: "1,000+", label: "Active Students" },
  { count: "10+", label: "Expert Mentors" },
  { count: "20+", label: "Courses" },
  { count: "95%", label: "Completion Rate" },
];

const StatsComponent = () => {
  return (
    <section
      className="bg-richblack-700"
      aria-labelledby="platform-statistics"
    >
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <h2 id="platform-statistics" className="sr-only">
          LearnSphere Statistics
        </h2>

        <div className="grid grid-cols-2 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col py-10"
            >
              <span className="text-[30px] font-bold text-richblack-5">
                {stat.count}
              </span>

              <span className="text-[16px] font-semibold text-richblack-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;