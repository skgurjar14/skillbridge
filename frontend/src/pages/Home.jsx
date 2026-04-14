import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobCard from "../components/Jobcard";
import "../styles/home.css";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= Load Jobs =================
  const loadJobs = async () => {
    try {
      const res = await axios.get("https://skillbridge-p3p8.onrender.com");

      const jobsWithData = res.data.map((job) => ({
        ...job,
        status: job.status || "open",
        userRating: job.userRating || 0,
      }));

      setJobs([...jobsWithData].reverse());

    } catch (err) {
      console.log(err);
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // ================= Nearby Jobs =================
  const getNearby = () => {
    setLoading(true);

    toast.info("Finding nearby services...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/jobs/nearby",
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          );

          const jobsWithData = res.data.map((job) => ({
            ...job,
            status: job.status || "open",
            userRating: job.userRating || 0,
          }));

          setJobs(jobsWithData);
          setLoading(false);

          toast.success("Nearby services loaded");

        } catch (err) {
          console.log(err);
          setLoading(false);
          toast.error("Failed to load nearby services");
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
        toast.error("Location permission denied");
      }
    );
  };

  // ================= APPLY JOB =================
  const applyJob = async (job) => {
    if (!user) {
      toast.warning("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/jobs/apply", {
        jobId: job._id,
        applicantName: user.name,
        applicantEmail: user.email,
        applicantPhone: user.phone,
        applicantId: user._id,
      });

      toast.success("Application sent successfully");

      loadJobs();

    } catch (err) {
      console.log(err);
      toast.error("Application failed");
    }
  };

  // ================= CANCEL JOB =================
  const cancelJob = async (job) => {
    if (!user) {
      toast.warning("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/jobs/apply", {
        jobId: job._id,
        applicantName: user.name,
        applicantEmail: user.email,
        applicantPhone: user.phone,
        applicantId: user._id,
      });

      toast.info("Application cancelled");

      loadJobs();

    } catch (err) {
      console.log(err);
      toast.error("Cancel failed");
    }
  };

  // ================= RATING =================
  const rateUser = async (job, rating) => {
    try {
      await axios.post("http://localhost:5000/api/jobs/rate", {
        userId: job.userId,
        rating,
      });

      toast.success("rating succes");

      setJobs((prev) =>
        prev.map((j) =>
          j.userId === job.userId ? { ...j, userRating: rating } : j
        )
      );

    } catch (err) {
      console.log(err);
      toast.error("Rating failed");
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h2>Find Local Services Instantly</h2>

        <p>
          Hire skilled people near you for quick jobs like electrician,
          cleaning, repair & more
        </p>

        <input
          placeholder="Search service or location (e.g. Plumber Bhopal)"
          className="search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="nearby-btn" onClick={getNearby}>
          📍 Nearby Services
        </button>

        <button className="nearby-btn" onClick={loadJobs}>
          🌍 All Services
        </button>

        {loading && <p>Finding Nearby Services...</p>}
      </div>

      <div className="jobs">
        {jobs
          .filter(
            (job) =>
              job?.title?.toLowerCase().includes(search.toLowerCase()) ||
              job?.location?.toLowerCase().includes(search.toLowerCase())
          )
          .map((job) => (
            <JobCard
              key={job._id}
              job={job}
              applyJob={applyJob}
              cancelJob={cancelJob}
              rateUser={rateUser}
              user={user}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;