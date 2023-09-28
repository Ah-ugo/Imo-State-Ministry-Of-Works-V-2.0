"use client";
import AdminNavComponent from "@/AdminComponents/AdminNavbarComponent";
import FooterSection from "@/Components/FooterSection";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import Parse from "parse/dist/parse.min.js";
import Lottie from "react-lottie-player";
import lottieJson from "../../../Assets/animation_lkjfxofn.json";

export default function page() {
  const [title, setTitle] = React.useState();
  const [paragraph1, setParagraph1] = React.useState();
  const [image1, setImage1] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const navigate = useRouter();

  console.log(image1 + "hdhdhdh");

  const SubmitProject = () => {
    // setLoading(true);
    const PARSE_APPLICATION_ID = process.env.NEXT_PUBLIC_APP_ID;
    const PARSE_HOST_URL = "https://parseapi.back4app.com/";
    const PARSE_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_JAVASCRIPT_KEY;
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;

    let Project = new Parse.Object("Projects");

    const GetImage1Class = document.getElementsByClassName("img_1")[0];
    // const GetImage2Class = document.getElementsByClassName("img_2")[0];

    if (!image1) {
      // Check if both images are uploaded
      console.error("Please upload both images.");
      // You can display an error message to the user here or use any other error handling mechanism.
      return; // Stop the submission process since both images are missing.
    }
    const parseImg1 = GetImage1Class.files[0];
    // const parseImg2 = GetImage2Class.files[0];
    const imgName = "photo.jpg";
    const ParseImg1 = new Parse.File(imgName, image1);
    // const ParseImg2 = new Parse.File(imgName, image2);

    Project.save({
      title: title,
      description: paragraph1,
      image: ParseImg1,
    })
      .then((res) => {
        console.log(res);
        // Submission successful, you can perform any necessary actions here.
        navigate.push("/Projects"); // Redirect to the "/blog" route after successful submission.
      })
      .catch((error) => {
        console.error("Error saving blog:", error);
        // Handle error, e.g., display an error message to the user.
      });
  };
  React.useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate.replace("/Pages/Admin");
    } else {
      navigate.replace("/Pages/AddProjects");
    }
  }, []);
  return (
    <div>
      <AdminNavComponent />
      <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <div class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900"
              for="name">
              Project Title
            </label>
            <input
              class="w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Project Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              id="name"
            />
          </div>
          {/* Project Image */}
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900">
              Project Image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload-1"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload-1"
                      name="file-upload-1"
                      type="file"
                      onChange={(e) => setImage1(e.target.files[0])}
                      className="sr-only img_1"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          {/* Project Description */}
          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900"
              for="message">
              Project Description
            </label>

            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Paragraph 1"
              rows="8"
              onChange={(e) => setParagraph1(e.target.value)}
              id="message"></textarea>
          </div>

          <div class="mt-4">
            <button
              onClick={SubmitProject}
              class="inline-block w-full rounded-lg bg-green-700 px-5 py-3 font-medium text-white sm:w-auto">
              Submit Blog
            </button>

            {loading ? (
              <div className="flex justify-center">
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{ width: "50%", height: "50%" }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
