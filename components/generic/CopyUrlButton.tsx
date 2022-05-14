import React, { useState } from "react";
import { BASE_PATH } from "../../lib/constants";
import { IconCopy } from "@supabase/ui";
import { useRouter } from "next/router";

const CopyUrlButton = () => {
  const router = useRouter();
  const [wiggleEffect, setWiggleEffect] = useState(false);
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  return (
    <button
      aria-label={"Copy URL of the current page"}
      className={"mr-8 " + (wiggleEffect && "animate-wiggle")}
      onClick={() => {
        navigator.clipboard.writeText(BASE_PATH + '/poll/' + router.query.id);
        setWiggleEffect(true);
        setShowCopiedTooltip(true);
      }}
      onAnimationEnd={() => {
        setWiggleEffect(false);
      }}
    >
      <div
        className={
          showCopiedTooltip ? "tooltip-open tooltip tooltip-accent" : "tooltip"
        }
        data-tip={showCopiedTooltip ? "copied!" : "Copy URL"}
      >
        <IconCopy className={"stroke-accent"} size={40} />
      </div>
    </button>
  );
};

export default CopyUrlButton;
