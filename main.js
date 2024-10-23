import { initViewer, loadModel } from './viewer.js';

async function getAccessToken() {
    try {
        const resp = await fetch('https://szdv06tuba.execute-api.us-east-1.amazonaws.com/default/ForgeTokenFunction', {
            method: 'POST'
        });
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const { access_token } = await resp.json();
        return access_token;
    } catch (err) {
        console.error('Error getting access token:', err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        const viewerContainer = document.getElementById('preview');
        const viewer = await initViewer(viewerContainer);
        const urn = 'YOUR_MODEL_URN';  // AutodeskのモデルのURNを指定
        await loadModel(viewer, urn);
    }
});
