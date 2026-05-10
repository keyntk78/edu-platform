export class VideoTranscodedEvent {
  static readonly pattern = 'video.transcoded';
  constructor(
    public readonly videoId: string,
    public readonly hlsUrl: string,
    public readonly thumbnailUrl: string,
  ) {}
}

export class VideoUploadedEvent {
  static readonly pattern = 'video.uploaded';
  constructor(
    public readonly videoId: string,
    public readonly courseId: string,
    public readonly originalUrl: string,
  ) {}
}
