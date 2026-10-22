import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatusLabel',
  standalone: true,
})
export class TaskStatusLabelPipe implements PipeTransform {
  transform(status: string | null | undefined): string {
    switch (status) {
      case 'Terminé':
        return '✓ Terminée';

      case 'En cours':
        return '⏳ En cours';

      case 'En attente':
        return '○ À commencer';

      default:
        return status || 'Statut inconnu';
    }
  }
}