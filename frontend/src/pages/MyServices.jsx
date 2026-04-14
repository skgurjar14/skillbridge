import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobCard from "../components/Jobcard";
import "../styles/home.css";

const API = "https://skillbridge-p3p8.onrender.com/api/jobs";

function MyServices() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // ================= LOAD MY JOBS =================
  const loadMyJobs = async () => {
    try {
      const res = await axios.get(`${API}/all`);

      const myJobs = res.data
        .filter((job) => job.userId === user?._id)
        .map((job) => ({
          ...job,
          status: job.status || "open",
        }));

      setJobs(myJobs);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    loadMyJobs();
  }, []);

  // ================= ACCEPT =================
  const acceptUser = async (job, userId) => {
    try {
      await axios.post(`${API}/accept`, {
        jobId: job._id,
        userId,
      });

      toast.success("Applicant accepted");
      loadMyJobs();
    } catch (err) {
      console.log(err);
      toast.error("Accept failed");
    }
  };

  // ================= START =================
  const startWork = async (job, userId) => {
    try {
      await axios.post(`${API}/start`, {
        jobId: job._id,
        userId,
      });

      toast.info("Work started");
      loadMyJobs();
    } catch (err) {
      console.log(err);
      toast.error("Start failed");
    }
  };

  // ================= COMPLETE =================
  const completeWork = async (job, userId) => {
    try {
      await axios.post(`${API}/complete`, {
        jobId: job._id,
        userId,
      });

      toast.success("Work completed 🎉");
      loadMyJobs();
    } catch (err) {
      console.log(err);
      toast.error("Complete failed");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>My Services</h2>

      <div className="jobs">
        {jobs.map((job) => (
          <div key={job._id}>
            <JobCard job={job} showDelete={true} />

            {/* Applicants */}
            <div className="applicants">
              <button
                className="view-btn"
                onClick={() =>
                  setSelectedJob(
                    selectedJob === job._id ? null : job._id
                  )
                }
              >
                👥 Applicants ({job.appliedUsers?.length || 0})
              </button>

              {selectedJob === job._id && (
                <div className="applicant-list">
                  {job.appliedUsers?.length === 0 && (
                    <p>No Applicants Yet</p>
                  )}

                  {job.appliedUsers?.map((applicant) => (
                    <div
                      key={applicant.userId}
                      className="applicant-card"
                    >
                      <p><b>Name:</b> {applicant.name}</p>
                      <p><b>Email:</b> {applicant.email}</p>
                      <p><b>Phone:</b> {applicant.phone}</p>
                      <p>
                        <b>Status:</b>{" "}
                        {applicant.status || "applied"}
                      </p>

                      {/* ACCEPT */}
                      {(applicant.status === "applied" ||
                        !applicant.status) && (
                        <button
                          className="apply-btn"
                          onClick={() =>
                            acceptUser(job, applicant.userId)
                          }
                        >
                          Accept
                        </button>
                      )}

                      {/* START */}
                      {applicant.status === "accepted" && (
                        <button
                          className="start-btn"
                          onClick={() =>
                            startWork(job, applicant.userId)
                          }
                        >
                          Start Work
                        </button>
                      )}

                      {/* COMPLETE */}
                      {applicant.status === "started" && (
                        <button
                          className="complete-btn"
                          onClick={() =>
                            completeWork(job, applicant.userId)
                          }
                        >
                          Complete
                        </button>
                      )}

                      {applicant.status === "completed" && (
                        <p className="completed">✅ Completed</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyServices;