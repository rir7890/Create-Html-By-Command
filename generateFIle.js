const fs = require("fs");
const path = require("path");

class GenerateFile {
  constructor() {
    this.outputFolderName = "htmlFiles";
    this.defaultHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    {{content}}
</body>
</html>`;
  }

  async createOutputFolder() {
    const outputPath = path.join(__dirname, this.outputFolderName);
    try {
      if (!fs.existsSync(outputPath)) {
        await fs.promises.mkdir(outputPath);
        console.log(`${this.outputFolderName} folder created successfully`);
      } else {
        console.log(`${this.outputFolderName} folder already exists`);
      }
      return outputPath;
    } catch (error) {
      throw new Error(
        `Failed to create ${this.outputFolderName} folder: ${error.message}`
      );
    }
  }

  validateOptions(options) {
    const { filename, title, content } = options;

    // console.log(filename, title, content);
    if (!filename) throw new Error("Filename is required");
    if (!title) throw new Error("Title is required");
    if (!content) throw new Error("Content is required");

    // Ensure filename has .html extension
    const finalFilename = filename.endsWith(".html")
      ? filename
      : `${filename}.html`;

    return {
      filename: finalFilename,
      title,
      content,
    };
  }

  async generateHtmlFile(filename, title, content) {
    try {
      // Validate input
      const validatedOptions = this.validateOptions({
        filename,
        title,
        content,
      });

      // Create output folder if it doesn't exist
      const outputPath = await this.createOutputFolder();

      // Generate HTML content
      const newHtmlFileContent = this.defaultHTML
        .replace("{{title}}", validatedOptions.title)
        .replace("{{content}}", validatedOptions.content);

      // Write file
      const filePath = path.join(outputPath, validatedOptions.filename);
      await fs.promises.writeFile(filePath, newHtmlFileContent);

      console.log(`HTML file created successfully: ${filePath}`);
      return filePath;
    } catch (error) {
      throw new Error(`Failed to generate HTML file: ${error.message}`);
    }
  }
}

module.exports = GenerateFile;
