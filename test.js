const transform = require('./transform');
const assert = require('assert');

describe('ChunkHashReplacePlugin', () => {
    it('should transform single js bundle', function () {
        const appBundle = 'app';
        const appHash = '11111';
        const appFile = `${appBundle}.${appHash}.js`;
        const chunks = [{ files: [appFile], hash: appHash }]
        const html = `<script src="${appBundle}.js"></script>`;
        assert.equal(transform(html, chunks), `<script src="${appFile}"></script>`);
    });

    it('should transform multiple js bundles', function () {
        const appBundle = 'app';
        const appHash = '11111';
        const appFile = `${appBundle}.${appHash}.js`;
        const vendorBundle = 'vendor';
        const vendorHash = '22222';
        const vendorFile = `${vendorBundle}.${vendorHash}.js`;

        const chunks = [
            { files: [appFile], hash: appHash },
            { files: [vendorFile], hash: vendorHash }
        ]

        const html = `<script src="${appBundle}.js"></script><script src="${vendorBundle}.js"></script>`;

        assert.equal(transform(html, chunks), `<script src="${appFile}"></script><script src="${vendorFile}"></script>`);
    });

    it('should transform css bundle', function () {
        const stylesBundle = 'app';
        const stylesHash = '11111';
        const stylesFile = `${stylesBundle}.${stylesHash}.css`;
        const chunks = [{ files: [stylesFile], hash: stylesHash }]
        const html = `<link href="${stylesBundle}.css" rel="stylesheet">`;
        assert.equal(transform(html, chunks), `<link href="${stylesFile}" rel="stylesheet">`);
    });

    it('should transform bundles with underscores in name', function () {
        const appBundle = 'app_bundle';
        const appHash = '11111';
        const appFile = `${appBundle}.${appHash}.js`;
        const chunks = [{ files: [appFile], hash: appHash }]
        const html = `<script src="${appBundle}.js"></script>`;
        assert.equal(transform(html, chunks), `<script src="${appFile}"></script>`);
    });
});