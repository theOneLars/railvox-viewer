export class FileStreamer {

  file: File
  offset: number
  defaultChunkSize: number
  textDecoder: TextDecoder


  constructor(file: File, encoding = 'utf-8') {
    this.file = file;
    this.offset = 0;
    this.defaultChunkSize = 10000 * 1024;// 64 * 1024; // bytes
    this.textDecoder = new TextDecoder(encoding);
    this.rewind();
  }

  rewind() {
    this.offset = 0;
  }

  isEndOfFile() {
    return this.offset >= this.getFileSize();
  }

  async eventPromise(target: FileReader, eventName: string): Promise<any> {
    return new Promise((resolve) => {
      const handleEvent = (event: any) => {
        resolve(event);
      };
      target.addEventListener(eventName, handleEvent);
    });
  }

  async readFile(blob: Blob) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob);
    const event = await this.eventPromise(fileReader, 'loadend');
    const target = event.target;
    if (target.error) {
      throw target.error;
    }
    return target.result;
  }

  async readBlockAsText(length = this.defaultChunkSize) {
    const blob = this.file.slice(this.offset, this.offset + length);
    const buffer = await this.readFile(blob);
    const decodedText = this.textDecoder.decode(buffer, { stream: true });
    this.offset += blob.size;

    if (this.isEndOfFile()) {
      const finalText = this.textDecoder.decode();
      if (finalText) {
        return decodedText + finalText;
      }
    }
    return decodedText;
  }
  getFileSize() {
    return this.file.size;
  }
}
