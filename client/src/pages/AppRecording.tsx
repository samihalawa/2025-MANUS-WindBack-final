import AppLayout from "@/components/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScreenRecorder } from "@/features/recording/useScreenRecorder";
import { useAudioRecorder } from "@/features/recording/useAudioRecorder";
import { Mic, Square, Play } from "lucide-react";
import { useState } from "react";

export default function AppRecording() {
  const [recordingMode, setRecordingMode] = useState<"idle" | "recording" | "paused">("idle");
  const screen = useScreenRecorder();
  const audio = useAudioRecorder();

  const handleStartRecording = async () => {
    try {
      await screen.startRecording();
      await audio.startRecording();
      setRecordingMode("recording");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const screenBlob = await screen.stopRecording();
      const audioBlob = await audio.stopRecording();
      setRecordingMode("idle");

      // 这里可以保存录制到服务器
      console.log("Screen recording:", screenBlob);
      console.log("Audio recording:", audioBlob);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Recording</h1>
            <p className="text-muted-foreground mt-2">
              Record your screen and audio for Rewind AI memory.
            </p>
          </div>

          {/* 录制控制 */}
          <Card>
            <CardHeader>
              <CardTitle>Recording Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 状态指示 */}
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${recordingMode === "recording" ? "bg-red-500 animate-pulse" : "bg-gray-300"}`} />
                <span className="font-medium">
                  {recordingMode === "idle" && "Ready to record"}
                  {recordingMode === "recording" && "Recording..."}
                  {recordingMode === "paused" && "Paused"}
                </span>
              </div>

              {/* 控制按钮 */}
              <div className="flex gap-4">
                {recordingMode === "idle" ? (
                  <Button
                    onClick={handleStartRecording}
                    size="lg"
                    className="gap-2"
                  >
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleStopRecording}
                      variant="destructive"
                      size="lg"
                      className="gap-2"
                    >
                      <Square className="w-5 h-5" />
                      Stop Recording
                    </Button>
                  </>
                )}
              </div>

              {/* 信息 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p>
                  Your screen and audio will be recorded locally. You can use this for creating memories and AI-powered insights.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 录制信息 */}
          <Card>
            <CardHeader>
              <CardTitle>Recording Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Screen Recording</p>
                  <p className="text-lg font-semibold">
                    {screen.isRecording ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Audio Recording</p>
                  <p className="text-lg font-semibold">
                    {audio.isRecording ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
