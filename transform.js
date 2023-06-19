function transform(template, chunks) {
    let htmlOutput = template;

    for (let chunk of chunks) {
        const { hash, files, names } = chunk;

        for (let file of files) {
            const extension = file.split('.').slice(-1).join('');
            
            const fileName = file
                .split(hash)
                .join('')
                .split('.')
                .slice(0, -1)
                .join('')
                .replace(/[^a-z0-9_$]/gi, '');

            let regex = null;
            switch (extension) {
                case 'js': {
                    regex = new RegExp(`(src=["'])([^'"]+/)?(${fileName}\.js)(["'])`, 'i');
                    break;
                }
                case 'css': {
                    regex = new RegExp(`(href=["'])([^'"]+/)?(${fileName}\.css)(["'])`, 'i');
                    break;
                }
                default:
                    continue;
            }

            htmlOutput = htmlOutput.replace(regex, (__match, p1, p2, __p3, p4) => {
                return `${p1}${p2 || ""}${file}${p4}`;
            });
        }
    }

    return htmlOutput;
}

module.exports = transform;
