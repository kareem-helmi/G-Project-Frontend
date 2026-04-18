import { validateFile } from "@/lib/utils/validation";
import { showError } from "@/components/ui/Toast";

interface FileUploadProps {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
}

export default function FileUpload({ selectedFile, onFileChange }: FileUploadProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const error = validateFile(file);

            if (error) {
                showError(error);
                return;
            }

            onFileChange(file);
        }
    };

    return (
        <div>
            <label className="text-bluelight-1 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 block font-medium">
                Upload File (Optional)
            </label>
            <div className="border-2 border-bluelight-1/40 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-bluelight-2 transition-all duration-300">
                <input
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-bluelight-2 hover:text-bluelight-1 transition-all duration-300 text-base sm:text-lg">
                        {selectedFile ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl">📄</span>
                                <span className="break-all">{selectedFile.name}</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl">📁</span>
                                <span>Click to upload medical file</span>
                            </div>
                        )}
                    </div>
                    <p className="text-bluelight-1/60 text-xs sm:text-sm mt-2">
                        Supported: PDF, JPG, PNG, DOC (Max 10MB)
                    </p>
                </label>
            </div>
        </div>
    );
}