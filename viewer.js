export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ env: 'AutodeskProduction', getAccessToken }, function () {
            const viewer = new Autodesk.Viewing.GuiViewer3D(container);
            viewer.start();
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Document.load(`urn:${urn}`, function (doc) {
            const defaultModel = doc.getRoot().getDefaultGeometry();
            viewer.loadDocumentNode(doc, defaultModel);
            resolve(viewer);
        }, function (err) {
            reject(err);
        });
    });
}
