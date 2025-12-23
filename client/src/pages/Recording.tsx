import { useState } from 'react';
import { useScreenRecorder } from '@/features/recording/useScreenRecorder';
import { useAudioRecorder } from '@/features/recording/useAudioRecorder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mic, Monitor } from 'lucide-react';

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function Recording() {
  const screenRecorder = useScreenRecorder();
  const audioRecorder = useAudioRecorder();
  const [recordingType, setRecordingType] = useState<'screen' | 'audio'>('screen');

  const isRecording = recordingType === 'screen' ? screenRecorder.isRecording : audioRecorder.isRecording;
  const isPaused = recordingType === 'screen' ? screenRecorder.isPaused : audioRecorder.isPaused;
  const duration = recordingType === 'screen' ? screenRecorder.duration : audioRecorder.duration;
  const error = recordingType === 'screen' ? screenRecorder.error : audioRecorder.error;

  const currentRecorder = recordingType === 'screen' ? screenRecorder : audioRecorder;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Rewind Recorder</CardTitle>
            <p className="text-slate-400 mt-2">Record your screen or audio and save memories</p>
          </CardHeader>
          <CardContent>
            <Tabs value={recordingType} onValueChange={(value) => setRecordingType(value as 'screen' | 'audio')}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                <TabsTrigger value="screen" className="data-[state=active]:bg-slate-600">
                  <Monitor className="w-4 h-4 mr-2" />
                  Screen
                </TabsTrigger>
                <TabsTrigger value="audio" className="data-[state=active]:bg-slate-600">
                  <Mic className="w-4 h-4 mr-2" />
                  Audio
                </TabsTrigger>
              </TabsList>

              <TabsContent value="screen" className="space-y-6 mt-6">
                <div className="bg-slate-700 rounded-lg p-8 text-center">
                  <div className="text-5xl font-mono font-bold text-white mb-4">
                    {formatDuration(duration)}
                  </div>
                  <p className="text-slate-400 mb-6">
                    {isRecording ? (isPaused ? 'Recording paused' : 'Recording in progress...') : 'Ready to record'}
                  </p>

                  {error && (
                    <div className="bg-red-900/20 border border-red-700 rounded p-4 mb-6 text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4 justify-center">
                    {!isRecording ? (
                      <Button
                        onClick={screenRecorder.startRecording}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                      >
                        Start Screen Recording
                      </Button>
                    ) : (
                      <>
                        {!isPaused ? (
                          <Button
                            onClick={screenRecorder.pauseRecording}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg"
                          >
                            Pause
                          </Button>
                        ) : (
                          <Button
                            onClick={screenRecorder.resumeRecording}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg"
                          >
                            Resume
                          </Button>
                        )}
                        <Button
                          onClick={screenRecorder.stopRecording}
                          className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg"
                        >
                          Stop
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="space-y-6 mt-6">
                <div className="bg-slate-700 rounded-lg p-8 text-center">
                  <div className="text-5xl font-mono font-bold text-white mb-4">
                    {formatDuration(duration)}
                  </div>
                  <p className="text-slate-400 mb-6">
                    {isRecording ? (isPaused ? 'Recording paused' : 'Recording in progress...') : 'Ready to record'}
                  </p>

                  {error && (
                    <div className="bg-red-900/20 border border-red-700 rounded p-4 mb-6 text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4 justify-center">
                    {!isRecording ? (
                      <Button
                        onClick={audioRecorder.startRecording}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                      >
                        Start Audio Recording
                      </Button>
                    ) : (
                      <>
                        {!isPaused ? (
                          <Button
                            onClick={audioRecorder.pauseRecording}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg"
                          >
                            Pause
                          </Button>
                        ) : (
                          <Button
                            onClick={audioRecorder.resumeRecording}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg"
                          >
                            Resume
                          </Button>
                        )}
                        <Button
                          onClick={audioRecorder.stopRecording}
                          className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg"
                        >
                          Stop
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 p-4 bg-slate-700 rounded-lg">
              <h3 className="text-white font-semibold mb-2">💡 Tips:</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Screen recording captures your browser display</li>
                <li>• Audio recording captures microphone input</li>
                <li>• Recordings are saved locally in your browser</li>
                <li>• Use pause/resume to control recording</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
