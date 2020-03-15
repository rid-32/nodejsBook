import * as fs from 'fs';
import { EventEmitter } from 'events';

class Watcher extends EventEmitter {
  private watchDir: string;

  constructor(watchDir: string) {
    super();

    this.watchDir = watchDir;

    this.watch = this.watch.bind(this);
  }

  private watch(): void {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        this.emit('process', file);
      });
    });
  }

  public start(): void {
    fs.watchFile(this.watchDir, this.watch);
  }
}

export default Watcher;
