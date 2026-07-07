import { useState, useRef } from "react";
import axios from "axios";

export default function ResumeUpload({ onParsed }) {
  const [state, setState] = useState("idle"); // idle | uploading | parsing | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setState("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("resume", file);
    //TODO : we have to change the   const res with actual url
    try {
      setState("parsing");
      const BASE = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        "http://localhost:5000/api/v1/resume/parse/parse-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (res.data?.success) {
        setState("success");
        onParsed(res.data.data);
      } else {
        throw new Error("Parse failed");
      }
    } catch (err) {
      setState("error");
      setErrorMsg(
        err?.response?.data?.message || "Failed to parse resume. Try again.",
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-[#0F172A] mb-3">
        Upload Resume
      </h3>

      {state === "idle" || state === "error" ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[#CBD5E1] hover:border-[#26A9C9] rounded-xl p-5 text-center cursor-pointer transition-colors group"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleChange}
          />
          <div className="w-9 h-9 rounded-lg bg-[#EAF3F6] flex items-center justify-center mx-auto mb-2.5 group-hover:bg-[#26A9C9]/10 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#26A9C9"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-[#334155]">
            Drop resume here
          </p>
          <p className="text-[12px] text-[#94A3B8] mt-0.5">
            PDF, DOC, DOCX · Max 5MB
          </p>
        </div>
      ) : null}

      {(state === "uploading" || state === "parsing") && (
        <div className="border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-3">
          <svg
            className="animate-spin size-5 text-[#26A9C9] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <div>
            <p className="text-[13px] font-medium text-[#334155]">
              {state === "uploading" ? "Uploading…" : "Parsing resume…"}
            </p>
            <p className="text-[12px] text-[#94A3B8] truncate max-w-[160px]">
              {fileName}
            </p>
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="border border-green-200 bg-green-50 rounded-xl p-4 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 5"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-green-800">
              Resume parsed
            </p>
            <p className="text-[12px] text-green-600 truncate">{fileName}</p>
          </div>
          <button
            onClick={() => {
              setState("idle");
              setFileName("");
            }}
            className="text-[12px] text-[#64748B] hover:text-[#26A9C9] transition-colors shrink-0"
          >
            Replace
          </button>
        </div>
      )}

      {state === "error" && (
        <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
