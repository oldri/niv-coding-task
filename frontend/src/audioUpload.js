import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });

const encodeWithEncodec = async (audioData) => {
    try {
        const session = await ort.InferenceSession.create(
            "./encodec_model.onnx"
        );
        const input = new ort.Tensor("float32", audioData, [
            1,
            audioData.length,
        ]);
        const output = await session.run({ input });
        return output.encodedAudio.data;
    } catch (error) {
        console.error("Error encoding audio:", error);
        throw new Error("Encoding failed");
    }
};

const uploadForm = document.getElementById("audioUploadForm");
const progressBar = document.getElementById("progress");
const progressBarFill = progressBar.firstElementChild;
const statusText = document.getElementById("status");

uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = document.getElementById("audioFile").files[0];
    if (file) {
        try {
            statusText.textContent = "";
            progressBar.style.display = "block";
            await ffmpeg.load();
            ffmpeg.FS(
                "writeFile",
                "input.wav",
                await fetchFile(URL.createObjectURL(file))
            );
            await ffmpeg.run("-i", "input.wav", "-ar", "24000", "output.wav");
            const data = ffmpeg.FS("readFile", "output.wav");
            const blob = new Blob([data.buffer], { type: "audio/wav" });
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const encodedAudio = await encodeWithEncodec(uint8Array);

            const response = await fetch("http://localhost:8000/encodec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: Array.from(encodedAudio) }),
            });

            if (!response.ok) throw new Error("Failed to upload audio");
            const result = await response.json();
            statusText.textContent = "Upload successful: " + result.message;
        } catch (error) {
            console.error(error);
            statusText.textContent = "Error: " + error.message;
            statusText.classList.add("error");
        } finally {
            progressBar.style.display = "none";
        }
    }
});
