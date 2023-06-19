const transform = require('./transform');
const assert = require('assert');

describe('ChunkHashReplacePlugin', () => {
    it('should transform single js bundle', () => {
        const appBundle = 'app';
        const appHash = '11111';
        const appFile = `${appBundle}.${appHash}.js`;
        const chunks = [{ files: [appFile], hash: appHash }]

        const html = `<script src="${appBundle}.js"></script>`;
        const transformedHtml = transform(html, chunks);
        const expectedOutput = `<script src="${appFile}"></script>`;

        assert.equal(transformedHtml, expectedOutput);
    });

    it('should transform multiple js bundles', () => {
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
        const transformedHtml = transform(html, chunks);
        const expectedOutput = `<script src="${appFile}"></script><script src="${vendorFile}"></script>`;

        assert.equal(transformedHtml, expectedOutput);
    });

    it('should transform css bundle', () => {
        const stylesBundle = 'app';
        const stylesHash = '11111';
        const stylesFile = `${stylesBundle}.${stylesHash}.css`;
        const chunks = [{ files: [stylesFile], hash: stylesHash }]

        const html = `<link href="${stylesBundle}.css" rel="stylesheet">`;
        const transformedHtml = transform(html, chunks);
        const expectedOutput = `<link href="${stylesFile}" rel="stylesheet">`;

        assert.equal(transformedHtml, expectedOutput);
    });

    it('should transform bundles with underscores in name', () => {
        const appBundle = 'app_bundle';
        const appHash = '11111';
        const appFile = `${appBundle}.${appHash}.js`;
        const chunks = [{ files: [appFile], hash: appHash }]

        const html = `<script src="${appBundle}.js"></script>`;
        const transformedHtml = transform(html, chunks);
        const expectedOutput = `<script src="${appFile}"></script>`;

        assert.equal(transformedHtml, expectedOutput);
    });

    it(`should transform multiple js bundles where one's name is same as the end of the other's hash`, function () {
        const app1Bundle = 'foo';
        const app1Hash = '321'; // last digit is 1
        const app1File = `${app1Bundle}.${app1Hash}.js`;
        const app2Bundle = '1'; // same as last digit of app1Hash
        const app2Hash = 'zzzz';
        const app2File = `${app2Bundle}.${app2Hash}.js`;

        const chunks = [
            { files: [app1File], hash: app1Hash },
            { files: [app2File], hash: app2Hash }
        ]

        const html = `<script src="${app1Bundle}.js"></script>`;
        const transformedHtml = transform(html, chunks);
        const expectedOutput = `<script src="${app1File}"></script>`;
        
        assert.equal(transformedHtml, expectedOutput);
    });
});