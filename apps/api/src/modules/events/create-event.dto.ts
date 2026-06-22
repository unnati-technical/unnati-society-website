export class CreateEventDto {
  title: string;
  description: string;
  date: string;
  location: string;
  link?: string;
  color?: string;
  autoArchive?: boolean;
}
