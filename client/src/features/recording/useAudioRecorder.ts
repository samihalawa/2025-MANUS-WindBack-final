import { useState, useRef, useCallback } from 'react';

interface AudioRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  error: string | null;
}

export function useAudioRecorder() {
  const [state, setState] = useState<AudioRecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const options = {
        mimeType: 'audio/webm;codecs=opus',
      };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'audio/webm';
      }
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        console.log('Audio recording completed:', url);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;

      setState((prev) => ({
        ...prev,
        isRecording: true,
        error: null,
      }));

      // 启动计时器
      let duration = 0;
      timerRef.current = setInterval(() => {
        duration += 1;
        setState((prev) => ({
          ...prev,
          duration,
        }));
      }, 1000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start audio recording',
      }));
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setState((prev) => ({
        ...prev,
        isPaused: true,
      }));
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      let duration = state.duration;
      timerRef.current = setInterval(() => {
        duration += 1;
        setState((prev) => ({
          ...prev,
          duration,
        }));
      }, 1000);
      setState((prev) => ({
        ...prev,
        isPaused: false,
      }));
    }
  }, [state.duration]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }

      setState((prev) => ({
        ...prev,
        isRecording: false,
        isPaused: false,
      }));

      return new Promise<Blob>((resolve) => {
        setTimeout(() => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          resolve(blob);
        }, 100);
      });
    }
  }, []);

  return {
    ...state,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  };
}
