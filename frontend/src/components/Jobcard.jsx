import axios from "axios";
import "../styles/jobcard.css";
import { useEffect, useState } from "react";
import { API } from "../config/api";

function JobCard({
  job,
  showDelete,
  applyJob,
  cancelJob,
  user,
  rateUser
}) {

  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= Distance =================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      if (job?.latitude && job?.longitude) {

        const lat1 = position.coords.latitude;
        const lon1 = position.coords.longitude;

        const lat2 = job.latitude;
        const lon2 = job.longitude;

        const dist = Math.sqrt(
          Math.pow(lat1 - lat2, 2) +
          Math.pow(lon1 - lon2, 2)
        ) * 111;

        setDistance(dist.toFixed(1));
      }

    });
  }, [job]);

  // ================= Applied User =================
  const appliedUser = job.appliedUsers?.find(
    u => u.userId === user?._id
  );

  // ================= DELETE =================
  const deleteJob = async () => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API}/api/jobs/delete/${job._id}`);
      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= APPLY =================
  const handleApply = async () => {
    try {
      await applyJob(job);
      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CANCEL =================
  const handleCancel = async () => {
    if (!window.confirm("Cancel application?")) return;

    try {
      await cancelJob(job);
      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ACCEPT =================
  const acceptUser = async () => {
    try {
      await axios.post(`${API}/api/jobs/accept`, {
        jobId: job._id,
        userId: appliedUser?.userId
      });

      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= START =================
  const startWork = async () => {
    try {
      await axios.post(`${API}/api/jobs/start`, {
        jobId: job._id,
        userId: user._id
      });

      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= COMPLETE =================
  const completeWork = async () => {
    if (!window.confirm("Mark completed?")) return;

    try {
      await axios.post(`${API}/api/jobs/complete`, {
        jobId: job._id,
        userId: user._id
      });

      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= RATING =================
  const handleRating = async (star) => {
    if (loading) return;

    setLoading(true);
    try {
      await rateUser(job, star);
      window.dispatchEvent(new Event("jobUpdated"));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="job-card">

      <div className="job-header">
        <h3>{job.title}</h3>
        <span className="price">₹ {job.budget}</span>
      </div>

      <p className="description">{job.description}</p>

      <div className="job-details">
        <p><b>📍 Location:</b> {job.location}</p>
        {distance && <p><b>📏 Distance:</b> {distance} km</p>}
        <p><b>📞 Contact:</b> {job.phone || "Not Provided"}</p>
        <p><b>👤 Posted By:</b> {job.postedBy}</p>
      </div>

      {/* ================= RATING ================= */}
      {appliedUser?.status === "completed" && (
        <div className="rating">
          <p>⭐ Rate Service</p>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className="star"
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIONS ================= */}
      <div className="job-actions">

        {applyJob && !appliedUser && job.status === "open" && (
          <button onClick={handleApply} className="apply-btn">
            Apply
          </button>
        )}

        {applyJob && appliedUser?.status === "applied" && (
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        )}

        {appliedUser?.status === "applied" && showDelete && (
          <button onClick={acceptUser} className="start-btn">
            Accept
          </button>
        )}

        {appliedUser?.status === "accepted" && (
          <button onClick={startWork} className="start-btn">
            Start Work
          </button>
        )}

        {appliedUser?.status === "started" && (
          <button onClick={completeWork} className="complete-btn">
            Complete
          </button>
        )}

        {showDelete && (
          <button onClick={deleteJob} className="delete-btn">
            Delete
          </button>
        )}

      </div>

    </div>
  );
}

export default JobCard;