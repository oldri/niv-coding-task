import { encodeWithEncodec } from "../audioUpload";

test("encodeWithEncodec encodes audio data correctly", async () => {
    const dummyAudioData = new Float32Array([0.5, -0.5, 0.5, -0.5]);
    const encodedAudio = await encodeWithEncodec(dummyAudioData);
    expect(encodedAudio).toBeDefined();
    expect(encodedAudio).toBeInstanceOf(Float32Array);
});
