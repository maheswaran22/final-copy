import React, { useEffect, useRef } from "react";
import "./styles.css";

const Announcements = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const announcementList = listRef.current;
    const announcements = announcementList?.children || [];
    let totalHeight = 0;
    for (let announcement of announcements) {
      totalHeight += announcement.offsetHeight;
    }
    const duration = totalHeight / 50;
    announcementList.style.animationDuration = `${duration}s`;
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Announcements</h1>
      <div
        style={{
          background: "rgb(94, 224, 244)",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          overflow: "hidden",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          className="announcement-list"
          ref={listRef}
          style={{
            position: "absolute",
            top: "100%",
            animationName: "scroll-up",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {[
            "New semester starts on September 5th!",
            "Library hours updated: Open until 10 PM on weekdays.",
            "Join us for the College Fair on October 12th.",
            "Workshop on Resume Writing next Wednesday at 3 PM.",
            "Deadline for scholarship applications is October 1st.",
            "Meet the faculty event on September 15th at 5 PM."
          ].map((text, index) => (
            <div
              className="announcement"
              key={index}
              style={{ padding: "10px", borderBottom: "1px solid #eee" }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Announcements;
