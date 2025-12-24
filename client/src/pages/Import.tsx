import { useState, useCallback } from 'react';
import { Upload, AlertTriangle, CheckCircle2, FileArchive, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'wouter';

export default function ImportPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [stats, setStats] = useState({ recordings: 0, dataSize: '0 GB', eta: '-' });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.zip')) {
      alert('Please upload a ZIP file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          setStats({ recordings: 142, dataSize: '2.3 GB', eta: '~5 min' });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-white">Import Your Data</h1>
        <p className="text-gray-400 text-center mb-12">Bring your Rewind/Limitless recordings to their new home</p>

        {/* Warning Banner */}
        <Card className="bg-yellow-500/10 border-yellow-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-400">Time-Sensitive: Export Before It's Gone</h2>
                <p className="text-gray-400">Rewind shut down Dec 19. Limitless cloud shuts down Dec 2026. Export now.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Step 1 */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0">1</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Export from Limitless</h3>
                  <ol className="text-gray-400 space-y-2">
                    <li>1. Open the Limitless app on your device</li>
                    <li>2. Go to Settings &rarr; Account &rarr; Export Data</li>
                    <li>3. Click "Download All Data" (creates a ZIP file)</li>
                    <li>4. Wait for download (may take 10-30 min depending on size)</li>
                  </ol>
                  <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Tip: Your export includes recordings, transcripts, and metadata
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4 text-white">Upload to Rewind 2.0</h3>
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition cursor-pointer ${
                      isDragging
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-600 hover:border-purple-500'
                    } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <input
                      id="file-input"
                      type="file"
                      accept=".zip"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    {uploadComplete ? (
                      <>
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg mb-2 text-white">Upload Complete!</p>
                        <p className="text-sm text-gray-500">Processing your data...</p>
                      </>
                    ) : isUploading ? (
                      <>
                        <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-lg mb-4 text-white">Uploading...</p>
                        <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">{uploadProgress}%</p>
                      </>
                    ) : (
                      <>
                        <FileArchive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg mb-2 text-white">Drop your Limitless export here</p>
                        <p className="text-sm text-gray-500">or click to browse - ZIP files up to 50GB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">That's It!</h3>
                  <p className="text-gray-400 mb-4">We'll process your import and notify you when ready. Usually takes 5-30 minutes.</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-lg text-center border border-slate-700">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{stats.recordings}</p>
                      <p className="text-sm text-gray-500">Recordings imported</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-lg text-center border border-slate-700">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{stats.dataSize}</p>
                      <p className="text-sm text-gray-500">Data transferred</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-lg text-center border border-slate-700">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{stats.eta}</p>
                      <p className="text-sm text-gray-500">Time to complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bonus */}
        <Card className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-2 text-white">Import Bonus</h3>
            <p className="text-gray-400 mb-4">Complete your import and get 3 months of Pro free. That's $27 saved.</p>
            <Link href="/pricing">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Create Account to Start Import
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Common Questions</h2>
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <FileArchive className="w-4 h-4 text-purple-400" />
                  What formats are supported?
                </h3>
                <p className="text-gray-400">We support Limitless ZIP exports, Rewind .rwnd files, and standard video/audio formats (MP4, MOV, M4A).</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  Is my data secure during import?
                </h3>
                <p className="text-gray-400">Yes. Imports are encrypted in transit and at rest. Data is processed locally when possible. We never share your data.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  Can I import if I'm on the free plan?
                </h3>
                <p className="text-gray-400">Yes! Free users can import up to 10 hours. Pro users can import unlimited data.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
