import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

const DownloadPage = () => {
//   const { "*": filePath } = useParams();
    const location = useLocation();
    const filePath = decodeURIComponent(location.pathname.replace("/download/", ""));  
    const [searchParams] = useSearchParams();
    const version = searchParams.get("version") || "";

    useEffect(() => {
        const downloadFile = async () => {
        if (!filePath) {
            alert("File path was not found.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const encodedPath = encodeURIComponent(filePath);
            const versionParam = version ? `?version=${version}` : "";  
            const url = `http://127.0.0.1:8000/download/${encodedPath}${versionParam}`;
            console.log(url)

            const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response:", errorText);
            throw new Error("There was an error while trying to download the file.");
            }

            const contentDisposition = response.headers.get("Content-Disposition");
            const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
            const filename = filenameMatch ? filenameMatch[1] : filePath.split("/").pop() || "file";

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.error("Error:", error);
        }
        };

        downloadFile();
    }, [filePath, version]);

    return <p>Downloading...</p>;
};

export default DownloadPage;
