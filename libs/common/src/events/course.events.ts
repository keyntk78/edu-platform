export class CoursePublishedEvent {
  static readonly pattern = 'course.published';
  constructor(
    public readonly courseId: string,
    public readonly instructorId: string,
    public readonly title: string,
  ) {}
}

export class LessonAddedEvent {
  static readonly pattern = 'lesson.added';
  constructor(
    public readonly lessonId: string,
    public readonly courseId: string,
    public readonly title: string,
  ) {}
}
