"use client";
import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import AdminNavComponent from "../../../AdminComponents/AdminNavbarComponent";
import { redirect, useRouter } from "next/navigation";
import Parse from "parse/dist/parse.min.js";
import Lottie from "react-lottie-player";
import lottieJson from "../../../Assets/animation_lkjfxofn.json";

export default function AddBlog() {
  const [title, setTitle] = useState();
  const [paragraph1, setParagraph1] = useState();
  const [paragraph2, setParagraph2] = useState();
  const [paragraph3, setParagraph3] = useState();
  const [paragraph4, setParagraph4] = useState();
  const [paragraph5, setParagraph5] = useState();
  const [paragraph6, setParagraph6] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [loading, setLoading] = useState(false);

  console.log(image1);
  console.log(image2);

  //   let know = JSON.parse(localStorage.getItem("userData")).username;
  //   console.log(know + "ddhdh");

  const navigate = useRouter();
  const SubmitBlog = () => {
    setLoading(true);
    const PARSE_APPLICATION_ID = process.env.NEXT_PUBLIC_APP_ID;
    const PARSE_HOST_URL = "https://parseapi.back4app.com/";
    const PARSE_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_JAVASCRIPT_KEY;
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;

    let Project = new Parse.Object("BlogPost");

    const GetImage1Class = document.getElementsByClassName("img_1")[0];
    const GetImage2Class = document.getElementsByClassName("img_2")[0];

    // console.log(GetImage1Class + "gged");

    // if (GetImage1Class.files.length > 0 && GetImage2Class.files.length > 0) {
    //   const parseImg1 = GetImage1Class.files[0];
    //   const parseImg2 = GetImage2Class.files[0];
    //   const imgName = "photo.jpg";
    //   const ParseImg1 = new Parse.File(imgName, parseImg1);
    //   const ParseImg2 = new Parse.File(imgName, parseImg2);
    //   // const SaveImage = ParseFile.save();

    //   Project.save({
    //     title: title,
    //     author: JSON.parse(localStorage.getItem("userData")).username,
    //     content: paragraph1,
    //     image1: ParseImg1,
    //     image2: ParseImg2,
    //     paragraph1: paragraph2,
    //     paragraph2: paragraph3,
    //     paragraph3: paragraph4,
    //     paragraph4: paragraph5,
    //     paragraph5: paragraph6,
    //   }).then((res) => {
    //     console.log(res);
    //     //   setInfo(true);
    //     navigate("/blog");
    //   });
    // }

    if (!image1 || !image2) {
      // Check if both images are uploaded
      console.error("Please upload both images.");
      // You can display an error message to the user here or use any other error handling mechanism.
      return; // Stop the submission process since both images are missing.
    }
    const parseImg1 = GetImage1Class.files[0];
    const parseImg2 = GetImage2Class.files[0];
    const imgName = "photo.jpg";
    const ParseImg1 = new Parse.File(imgName, image1);
    const ParseImg2 = new Parse.File(imgName, image2);

    Project.save({
      title: title,
      author: JSON.parse(localStorage.getItem("userData")).username,
      content: paragraph1,
      image1: ParseImg1,
      image2: ParseImg2,
      paragraph1: paragraph2,
      paragraph2: paragraph3,
      paragraph3: paragraph4,
      paragraph4: paragraph5,
      paragraph5: paragraph6,
    })
      .then((res) => {
        console.log(res);
        // Submission successful, you can perform any necessary actions here.
        navigate.push("/Blogs"); // Redirect to the "/blog" route after successful submission.
      })
      .catch((error) => {
        console.error("Error saving blog:", error);
        // Handle error, e.g., display an error message to the user.
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate.replace("/Pages/Admin");
    } else {
      navigate.replace("/Pages/AddBlog");
    }
  }, []);
  return (
    <div>
      <AdminNavComponent />
      <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <div class="space-y-4">
          <div>
            <label class="sr-only" for="name">
              Title
            </label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              id="name"
            />
          </div>

          <div>
            <label class="sr-only" for="message">
              Paragraph 1
            </label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Paragraph 1"
              rows="8"
              onChange={(e) => setParagraph1(e.target.value)}
              id="message"></textarea>
          </div>

          <div>
            <label class="sr-only" for="message">
              Paragraph 2
            </label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Paragraph 2"
              rows="8"
              onChange={(e) => setParagraph2(e.target.value)}
              id="message"></textarea>
          </div>
          <div>
            <label class="sr-only" for="message">
              Paragraph 3
            </label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Paragraph 3"
              rows="8"
              onChange={(e) => setParagraph3(e.target.value)}
              id="message"></textarea>
          </div>
          <div>
            <label class="sr-only" for="message">
              Paragraph 4
            </label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Paragraph 4"
              rows="8"
              onChange={(e) => setParagraph4(e.target.value)}
              id="message"></textarea>
          </div>
          <div>
            <label class="sr-only" for="message">
              Paragraph 5
            </label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Paragraph 5"
              rows="8"
              onChange={(e) => setParagraph5(e.target.value)}
              id="message"></textarea>
          </div>

          <div>
            <label class="sr-only" for="message">
              Paragraph 6
            </label>

            <textarea
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Paragraph 6"
              onChange={(e) => setParagraph6(e.target.value)}
              rows="6"
              id="message"></textarea>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900">
              Cover Image
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
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900">
              Second Image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload-2"
                      name="file-upload-2"
                      type="file"
                      onChange={(e) => setImage2(e.target.files[0])}
                      className="sr-only img_2"
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

          <div class="mt-4">
            <button
              onClick={SubmitBlog}
              class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
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
    </div>
  );
}
