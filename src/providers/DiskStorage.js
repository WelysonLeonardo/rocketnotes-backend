const fs = require('fs');
const path = require('path');
const uploadconfig = require("../configs/upload");


class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadconfig.TMP_FOLDER, file),
            path.resolve(uploadconfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadconfig.UPLOADS_FOLDER, file);
        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;
