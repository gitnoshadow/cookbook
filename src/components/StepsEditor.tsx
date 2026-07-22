"use client";

import { useState } from "react";

type StepsEditorProps = {
  steps: string[];
  onChange: (steps: string[]) => void;
};

export default function StepsEditor({ steps, onChange }: StepsEditorProps) {
  const addStep = () => {
    onChange([...steps, ""]);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    onChange(newSteps);
  };

  const removeStep = (index: number) => {
    onChange(steps.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="font-semibold" style={{ color: "#5d4037" }}>👩‍🍳 做法步驟</label>
        <button type="button" onClick={addStep} className="cute-btn text-sm text-white px-4" style={{ background: "#c8e6c9", color: "#2e7d32" }}>
          ＋ 新增步驟
        </button>
      </div>
      {steps.length === 0 && (
        <p className="text-sm" style={{ color: "#8d6e63" }}>尚未加入步驟，點擊上方按鈕新增</p>
      )}
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="mt-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "#ff8fab" }}>
            {i + 1}
          </span>
          <textarea
            value={step}
            onChange={(e) => updateStep(i, e.target.value)}
            placeholder={`步驟 ${i + 1}：描述這個步驟...`}
            rows={2}
            className="cute-input flex-1 resize-none"
          />
          <button type="button" onClick={() => removeStep(i)} className="mt-2 text-lg hover:opacity-70" title="刪除步驟">
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
