"use client";

import { useRef, useState } from "react";

type ImageUploadProps = {
  onUpload: (url: string) => void;
  currentImage?: string | null;
};

export default function ImageUpload({ onUpload, currentImage }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onUpload(data.url);
      }
    } catch {
      alert("上傳失敗，請再試一次");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleClick}
        className="cute-btn border-2 border-dashed w-full h-32 flex flex-col items-center justify-center gap-2"
        style={{ borderColor: "#fce4ec", background: "#fff5f7" }}
      >
        {uploading ? (
          <span className="text-lg">⏳ 上傳中...</span>
        ) : preview ? (
          <img src={preview} alt="preview" className="h-full object-contain rounded-lg" />
        ) : (
          <>
            <span className="text-3xl">📸</span>
            <span className="text-sm" style={{ color: "#8d6e63" }}>點擊上傳照片</span>
          </>
        )}
      </button>
    </div>
  );
}
