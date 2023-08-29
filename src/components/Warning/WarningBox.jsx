import { useEffect, useState } from "react";

const WarningBox = () => {
  const deadline = new Date("2023-06-28T24:00:00");
  const [remainingTime, setRemainingTime] = useState(
    getTimeRemaining(deadline)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getTimeRemaining(deadline));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [deadline]);

  return (
    <>
      <div className="w-full flex items-center justify-center gap-5 flex-col md:flex-row">
        <div className="w-fit">
          <p className="text-sm mb-1 font-medium">
            Time is running out chief, You have only,{" "}
          </p>
          <div className="md:text-4xl text-3xl font-bold text-gray-800 grid grid-cols-4 gap-2">
            <p className="p-4 rounded-xl shadow-lg flex items-center justify-center flex-col">
              {`${remainingTime.days.toString().padStart(2, "0")}`}{" "}
              <span className="text-xs md:text-sm">Days</span>
            </p>
            <p className="p-4 rounded-xl shadow-lg flex items-center justify-center flex-col">
              {`${remainingTime.hours.toString().padStart(2, "0")}`}{" "}
              <span className="text-xs md:text-sm">Hours</span>
            </p>
            <p className="p-4 rounded-xl shadow-lg flex items-center justify-center flex-col">
              {`${remainingTime.minutes.toString().padStart(2, "0")}`}{" "}
              <span className="text-xs md:text-sm">Minutes</span>
            </p>
            <p className="p-4 rounded-xl shadow-lg flex items-center justify-center flex-col">
              {`${remainingTime.seconds.toString().padStart(2, "0")}`}{" "}
              <span className="text-xs md:text-sm">Seconds</span>
            </p>
          </div>
        </div>
        <div>
          <p className="w-full font-medium md:text-base text-sm">
            Chief 🫡, it seems you have forgotten to pay your developer. <br />{" "}
            Please complete the payment as soon as possible, otherwise, you will
            lose access.
          </p>
        </div>
      </div>
    </>
  );
};
const getTimeRemaining = (endTime) => {
  const totalSeconds = Math.floor((endTime - Date.now()) / 1000);
  if (totalSeconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
export default WarningBox;
