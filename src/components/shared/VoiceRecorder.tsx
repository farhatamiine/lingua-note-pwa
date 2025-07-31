import React, { useEffect, useState } from "react";
import { useAudioRecorder } from "react-use-audio-recorder";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Mic, Pause, Play, CirclePause } from "lucide-react";

interface VoiceRecorderProps {
  onBlobReady: (blob: Blob, url: string) => void;
}

export default function VoiceRecorder({ onBlobReady }: VoiceRecorderProps) {
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    recordingTime,
    recordingStatus,
    getBlob,
  } = useAudioRecorder();

  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    const blob = getBlob();
    console.log(blob);

    if (blob) {
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      onBlobReady(blob, url);
    }
  }, [getBlob, onBlobReady]);

  return (
    <div className="space-y-2 w-full">
      <Label className="text-sm text-muted-foreground">
        Recording - {recordingStatus}
      </Label>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="icon"
          onClick={startRecording}
          disabled={recordingStatus !== "idle" && recordingStatus !== "stopped"}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={pauseRecording}
          disabled={recordingStatus !== "recording"}
        >
          <Pause className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={resumeRecording}
          disabled={recordingStatus !== "paused"}
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => stopRecording()}
          disabled={
            recordingStatus !== "recording" && recordingStatus !== "paused"
          }
        >
          <CirclePause className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {recordingStatus} - {recordingTime}s
        </span>
      </div>
      {audioURL && (
        <audio controls className="w-full rounded">
          <source src={audioURL} type="audio/webm" />
        </audio>
      )}
    </div>
  );
}
