import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
// import Card from "./components/Card";

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const rest = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        ContentType: "aplication/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //delete job
  const deleteJob = async (id) => {
    const rest = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const editJob = () => {
    console.log("edit");
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route
            path="/jobs/:id"
            element={<JobPage deleteJob={deleteJob} />}
            loader={jobLoader}
          />
          <Route
            path="/add-job/"
            element={<AddJobPage addJobSubmit={addJob} />}
          />
          <Route
            path="/edit-job/:id"
            element={<EditJobPage editJobSubmit={editJob} />}
            loader={jobLoader}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        {/*nu vreau sa aibe mainLayout, navbar */}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
